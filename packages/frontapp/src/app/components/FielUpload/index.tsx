import React, { FC, useRef } from 'react';
import { ReactComponent as PhotoIcon } from '../../../assets/Photo.svg';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';

const WrapperUploadFile = styled.div`
  width: 12.25rem;
  height: 20.5rem;
  border: 1px solid ${colors.accent_color};
  border-radius: ${dimensions.xs_1};
  background-color: #f9faff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${dimensions.tablet_width}) {
    width: 15rem;
  }

  @media (max-width: ${dimensions.phone_width}) {
    width: 15rem;
  }
`;

const StyledUploadFile = styled.span`
  display: block;
  text-decoration: underline;
  color: ${colors.accent_color};
  text-align: center;
  margin-top: 0.25rem;
  width: 100%;
  cursor: pointer;

  @media (max-width: ${dimensions.tablet_width}) {
    margin-top: 0.5rem;
    font-size: ${dimensions.sm};
    line-height: ${dimensions.xl};
  }
`;

const StyledImg = styled.img`
  height: 20.5rem;
  width: 12.3rem;
  border-radius: ${dimensions.xs_1};
  cursor: pointer;

  @media (max-width: ${dimensions.tablet_width}) {
    height: 15.5rem;
    width: 7.3rem;
  }

  @media (max-width: ${dimensions.tablet_width}) {
    height: 18.125rem;
    width: 12.125rem;
  }
`;

interface IPropsUploadFile {
  file: File | null;
  handleChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  pictureOfCover: string | null;
}

const FileUpload: FC<IPropsUploadFile> = ({
  file,
  handleChangeFile,
  pictureOfCover,
}) => {
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <>
      {pictureOfCover && (
        <>
          <StyledImg
            onClick={() => ref?.current?.click()}
            src={pictureOfCover}
            alt="material pictureOfCover"
          />
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/*"
            style={{ display: 'none' }}
            ref={ref}
          />
        </>
      )}
      {!pictureOfCover && (
        <WrapperUploadFile onClick={() => ref?.current?.click()}>
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/*"
            style={{ display: 'none' }}
            ref={ref}
          />
          <PhotoIcon />
        </WrapperUploadFile>
      )}
      <StyledUploadFile onClick={() => ref?.current?.click()}>
        {file ? 'Upload new' : 'Upload File'}
      </StyledUploadFile>
    </>
  );
};

export default FileUpload;
