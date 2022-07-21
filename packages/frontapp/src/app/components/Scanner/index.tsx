import { ChangeEvent, FC, memo, useEffect, useMemo } from 'react';
import { scanImageData } from 'zbar.wasm';
import styled from '@emotion/styled';
import { createPortal } from 'react-dom';
import { colors, dimensions } from '@mimir/ui-kit';
import InputMask from 'react-input-mask';
import { ReactComponent as CloseSvg } from '../../../assets/Close.svg';

export interface IScannerProps {
  onDetected: (code: string) => void;
  onClose: () => void;
  showInput?: boolean;
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
  font-size: ${dimensions.base};
  line-height: 100%;
  color: ${colors.bg_secondary};
  outline: none;

  &::placeholder {
    color: ${colors.bg_secondary};
  }
`;

const VideoContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  video {
    /* width: 100%; */
    height: 100%;
    /* object-fit: cover; */
  }
`;

const ScannerFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin: auto;
  box-shadow: 0 0 0 3000px rgba(120, 120, 120, 0.6),
    inset 0 0 0 ${dimensions.xs} rgba(120, 120, 120, 0.6);
  border-radius: ${dimensions.xl};

  img {
    opacity: 0.6;
  }

  .corner {
    position: absolute;
    height: ${dimensions.xl_6};
    width: ${dimensions.xl_6};

    &.tl {
      top: 0;
      left: 0;
      border-top: 3px solid ${colors.bg_secondary};
      border-left: 3px solid ${colors.bg_secondary};
      border-top-left-radius: ${dimensions.xl};
    }

    &.tr {
      top: 0;
      right: 0;
      border-top: 3px solid ${colors.bg_secondary};
      border-right: 3px solid ${colors.bg_secondary};
      border-top-right-radius: ${dimensions.xl};
    }

    &.bl {
      bottom: 0;
      left: 0;
      border-bottom: 3px solid ${colors.bg_secondary};
      border-left: 3px solid ${colors.bg_secondary};
      border-bottom-left-radius: ${dimensions.xl};
    }

    &.br {
      bottom: 0;
      right: 0;
      border-bottom: 3px solid ${colors.bg_secondary};
      border-right: 3px solid ${colors.bg_secondary};
      border-bottom-right-radius: ${dimensions.xl};
    }
  }
`;

const ScannerCanvas = styled.canvas`
  display: none;
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
  cursor: pointer;

  svg {
    fill: ${colors.accent_color};
    width: ${dimensions.xl_3};
    height: ${dimensions.xl_3};
  }
`;

const Scanner: FC<IScannerProps> = memo(
  ({ onDetected, onClose, showInput = false }) => {
    let videoStream: MediaStream | null;
    const scannerElement = useMemo(
      () => document.querySelector('#scanner')!,
      []
    );
    const timeout = 300;

    useEffect(() => {
      showScanner();

      const videoElement = document.querySelector<HTMLVideoElement>(
        '#scanner-video video'
      )!;
      const canvasElement =
        document.querySelector<HTMLCanvasElement>('#scanner-canvas')!;
      const frameElement =
        document.querySelector<HTMLDivElement>('#scanner-frame')!;
      const constraints: MediaStreamConstraints = {
        audio: false,
        video: {
          facingMode: 'environment',
          width: 4096,
          height: 2160,
        },
      };
      const frameSize = dinamicFrameSize(window.innerWidth, window.innerHeight);

      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        videoStream = stream;

        videoElement.addEventListener('play', () => {
          const canvasSize = dinamicFrameSize(
            videoElement.videoWidth,
            videoElement.videoHeight
          );

          canvasElement.width = canvasSize.width;
          canvasElement.height = canvasSize.height;

          frameElement.style.width = `${frameSize.width}px`;
          frameElement.style.height = `${frameSize.height}px`;
          frameElement.style.left = `${
            (window.innerWidth - frameSize.width) / 2
          }px`;
          frameElement.style.top = `${
            (window.innerHeight - frameSize.height) / 2
          }px`;

          scanFrame();
        });

        videoElement.srcObject = stream;
      });

      async function scanFrame() {
        if (videoStream) {
          const ctx = canvasElement.getContext('2d')!;
          ctx.drawImage(
            videoElement,
            (videoElement.videoWidth - canvasElement.width) / 2,
            (videoElement.videoHeight - canvasElement.height) / 2,
            canvasElement.width,
            canvasElement.height,
            0,
            0,
            canvasElement.width,
            canvasElement.height
          );

          const imgData = ctx.getImageData(
            0,
            0,
            canvasElement.width,
            canvasElement.height
          );
          const res = await scanImageData(imgData);
          console.log(res[0]?.decode());
          found(res[0]?.decode());
          setTimeout(scanFrame, timeout); // repeat
        }
      }

      function dinamicFrameSize(
        viewfinderWidth: number,
        viewfinderHeight: number
      ) {
        const minEdgePercentage = 0.85; // 85%
        const minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
        const size = Math.floor(minEdgeSize * minEdgePercentage);
        return {
          width: size,
          height: size,
        };
      }
    }, []);

    function found(result?: string) {
      if (!result) return;
      onDetected(result);
      closeScanner();
    }

    function closeScanner() {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop()); // stop webcam feed
        videoStream = null;
        hideScanner();
        onClose();
      }
    }

    function showScanner() {
      scannerElement.setAttribute('style', 'display: block');
    }

    function hideScanner() {
      scannerElement.setAttribute('style', 'display: none');
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
      const value = event.target.value;
      if (!value.includes('_') && value.length) {
        onDetected(value.replace(/-/g, ''));
        closeScanner();
      }
    }

    return createPortal(
      <>
        <VideoContainer id="scanner-video">
          <video playsInline autoPlay></video>
          <ScannerFrame id="scanner-frame">
            <div className="corner tl" />
            <div className="corner tr" />
            <div className="corner bl" />
            <div className="corner br" />
            <img src="../../../assets/isbn.png" alt="ISBN Example" />
          </ScannerFrame>
        </VideoContainer>
        <ScannerCanvas id="scanner-canvas" />
        <ScannerControls>
          {showInput && (
            <InputMask
              placeholder="Enter ISBN"
              mask="999-9-999-99999-9"
              onChange={handleInputChange}
            >
              <Input />
            </InputMask>
          )}
          <CloseButton onClick={closeScanner}>
            <CloseSvg />
          </CloseButton>
        </ScannerControls>
      </>,
      scannerElement
    );
  }
);

export default Scanner;
