import { FC, useEffect, useMemo, useState } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import styled from '@emotion/styled';
import { createPortal } from 'react-dom';
import { colors, dimensions } from '@mimir/ui-kit';
import { ReactComponent as FlashlightSvg } from '../../../assets/flashlight.svg';
import { ReactComponent as CloseSvg } from '../../../assets/Close.svg';

interface IScannerProps {
  active: boolean;
  onDetected: (code: string) => void;
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

const Scanner: FC<IScannerProps> = ({ active, onDetected }) => {
  const [isScannerReady, setIsScannerReady] = useState(false);
  const scannerRootElement = useMemo(
    () => document.querySelector('#scanner-root')!,
    []
  );

  useEffect(() => {
    if (!active) return;

    scannerRootElement.setAttribute('style', 'display: block');
    document.body.style.overflow = 'hidden';

    const html5QrCode = new Html5Qrcode('scanner', {
      formatsToSupport: [
        Html5QrcodeSupportedFormats.QR_CODE,
        Html5QrcodeSupportedFormats.EAN_13,
      ],
      verbose: false,
    });

    const initScanner = async () => {
      const devices = await Html5Qrcode.getCameras();

      if (!devices.length) return;

      const cameraId = devices[0].id;

      const dinamicQrBox = (
        viewfinderWidth: number,
        viewfinderHeight: number
      ) => {
        console.log(viewfinderHeight, viewfinderWidth);
        const minEdgePercentage = 0.8; // 80%
        const minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
        const qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
        return {
          width: qrboxSize,
          height: qrboxSize,
        };
      };

      html5QrCode
        .start(
          cameraId,
          {
            fps: 10, // Optional, frame per seconds for qr code scanning
            qrbox: dinamicQrBox, // Optional, if you want bounded box UI
          },
          (decodedText) => {
            html5QrCode.stop();
            onDetected(decodedText);
            setIsScannerReady(false);
            scannerRootElement.setAttribute('style', 'display: none');
            document.body.style.overflow = '';
          },
          (errorMessage) => {
            // parse error, ignore it.
          }
        )
        .catch((err) => {
          // Start failed, handle it.
        });
    };

    initScanner().then(() => setIsScannerReady(true));

    return () => {
      html5QrCode.stop();
      html5QrCode.clear();
    };
  }, [active, onDetected, scannerRootElement]);

  return createPortal(
    <ScannerControls>
      {isScannerReady && (
        <>
          <Input value="_ _ _-_-_ _ _-_ _ _ _ _-_" readOnly />
          <FlashlightContainer>
            <FlashlightSvg />
          </FlashlightContainer>
          <CloseButton>
            <CloseSvg />
          </CloseButton>
        </>
      )}
    </ScannerControls>,
    scannerRootElement
  );
};

export default Scanner;
