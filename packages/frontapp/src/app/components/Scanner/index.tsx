import { FC, useEffect, useMemo } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import styled from '@emotion/styled';
import { createPortal } from 'react-dom';
import { dimensions } from '@mimir/ui-kit';

interface IScannerProps {
  active: boolean;
  onDetected: (code: string) => void;
}

const ScannerControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;

const Input = styled.input`
  padding: ${dimensions.base};
  border-radius: 100px;
  border: 0;
  background-color: rgba(29, 29, 29, 0.5);
`;

const Scanner: FC<IScannerProps> = ({ active, onDetected }) => {
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

    initScanner();

    return () => {
      html5QrCode.clear();
    };
  }, [active, onDetected, scannerRootElement]);

  return createPortal(
    <ScannerControls>
      <Input />
    </ScannerControls>,
    scannerRootElement
  );
};

export default Scanner;
