import { FC, useEffect, useMemo, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import styled from '@emotion/styled';
import { createPortal } from 'react-dom';
import { colors, dimensions } from '@mimir/ui-kit';
import { ReactComponent as FlashlightSvg } from '../../../assets/flashlight.svg';
import { ReactComponent as CloseSvg } from '../../../assets/Close.svg';
import { Result } from '@zxing/library';

interface IScannerProps {
  active: boolean;
  onDetected: (code: string) => void;
  onClose: () => void;
}

const ScannerControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding-bottom: ${dimensions.base_2};
`;

const Input = styled.input`
  padding: ${dimensions.base};
  border-radius: 100px;
  border: 0;
  background-color: rgba(29, 29, 29, 0.5);
  color: ${colors.bg_secondary};
  outline: none;
`;

const FlashlightContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(29, 29, 29, 0.5);
  height: 48px;
  width: 48px;
  border-radius: 50%;
  margin-left: ${dimensions.base};
`;

const VideoContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ScannerFrame = styled.div`
  position: absolute;
  margin: auto;
  box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.5);
  border: 2px solid orange;
`;

const ScannerCanvas = styled.canvas`
  display: none;
  width: 100%;
  margin: auto;
`;

const ScannerImage = styled.img`
  display: none;
  width: 100%;
  margin: auto;
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${dimensions.base};
  right: ${dimensions.base};
  width: ${dimensions.xl_6};
  height: ${dimensions.xl_6};
  background-color: ${colors.bg_secondary};
  border-radius: 50%;

  svg {
    fill: ${colors.accent_color};
    width: ${dimensions.xl_3};
    height: ${dimensions.xl_3};
  }
`;

const Scanner: FC<IScannerProps> = ({ active, onDetected, onClose }) => {
  const [handleSwitchTorch, setHandleSwitchTorch] =
    useState<(onOff: boolean) => Promise<void>>();

  const scannerElement = useMemo(() => document.querySelector('#scanner')!, []);

  let videoStream: MediaStream | null;
  const barcodeReader = new BrowserMultiFormatReader();
  const timeout = 1000; // time between frames

  useEffect(() => {
    if (!active) return;

    showScanner();

    const videoElement = document.querySelector<HTMLVideoElement>(
      '#scanner-video video'
    )!;
    const canvasElement =
      document.querySelector<HTMLCanvasElement>('#scanner-canvas')!;
    const imageElement =
      document.querySelector<HTMLImageElement>('#scanner-image')!;
    const frameElement =
      document.querySelector<HTMLDivElement>('#scanner-frame')!;

    const constraints = { video: true };
    const frameSize = dinamicFrameSize(window.innerWidth, window.innerHeight);

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      videoStream = stream;

      // handle play callback
      videoElement.addEventListener('play', () => {
        // get video's intrinsic width and height, eg 640x480,
        // and set canvas to it to match.

        canvasElement.width = frameSize.width;
        canvasElement.height = frameSize.height;

        // set position of orange frame in video
        frameElement.style.width = `${frameSize.width}px`;
        frameElement.style.height = `${frameSize.height}px`;
        frameElement.style.left = `${
          (window.innerWidth - frameSize.width) / 2
        }px`;
        frameElement.style.top = `${
          (window.innerHeight - frameSize.height) / 2
        }px`;

        // start the barcode reader process
        scanFrame();
      });

      videoElement.srcObject = stream;
    });

    function scanFrame() {
      if (videoStream) {
        // copy the video stream image onto the canvas
        canvasElement.getContext('2d')!.drawImage(
          videoElement,
          // source x, y, w, h:
          (videoElement.videoWidth - frameSize.width * 0.5) / 2,
          (videoElement.videoHeight - frameSize.height * 0.5) / 2,
          frameSize.width * 0.5,
          frameSize.height * 0.5,
          // dest x, y, w, h:
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );
        // convert the canvas image to an image blob and stick it in an image element
        canvasElement.toBlob((blob) => {
          const url = URL.createObjectURL(blob!);
          // when the image is loaded, feed it to the barcode reader
          imageElement.onload = async () => {
            barcodeReader
              .decodeFromImageUrl(url)
              .then(found) // calls onFoundBarcode with the barcode string
              .catch(notfound)
              .finally(() => releaseMemory(imageElement));
            imageElement.onload = null;
            setTimeout(scanFrame, timeout); // repeat
          };
          imageElement.src = url; // load the image blob
        });
      }
    }

    function dinamicFrameSize(
      viewfinderWidth: number,
      viewfinderHeight: number
    ) {
      const minEdgePercentage = 0.8; // 80%
      const minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
      const size = Math.floor(minEdgeSize * minEdgePercentage);
      return {
        width: size,
        height: size,
      };
    }
  }, [active]);

  function found(result: Result) {
    onDetected(result.getText());
    closeScanner();
  }

  function notfound(err: Error) {
    if (err.name !== 'NotFoundException') {
      console.error(err);
    }
  }

  function releaseMemory(imageElement: HTMLImageElement) {
    URL.revokeObjectURL(imageElement.src); // release image blob memory
    // imageElement.src = '';
  }

  function closeScanner() {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop()); // stop webcam feed
      videoStream = null;
    }
    onClose();
    hideScanner();
  }

  function showScanner() {
    scannerElement.setAttribute('style', 'display: block');
  }

  function hideScanner() {
    scannerElement.setAttribute('style', 'display: none');
  }

  return createPortal(
    <>
      <VideoContainer id="scanner-video">
        <video playsInline autoPlay></video>
        <ScannerFrame id="scanner-frame" />
      </VideoContainer>
      <ScannerCanvas id="scanner-canvas" />
      <ScannerImage id="scanner-image" />
      <ScannerControls>
        <Input value="_ _ _-_-_ _ _-_ _ _ _ _-_" readOnly />
        <FlashlightContainer>
          <FlashlightSvg />
        </FlashlightContainer>
        <CloseButton onClick={closeScanner}>
          <CloseSvg />
        </CloseButton>
      </ScannerControls>
    </>,
    scannerElement
  );
};

export default Scanner;
