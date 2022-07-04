import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import axios from 'axios';
import { colors, dimensions } from '@mimir/ui-kit';
import { ReactComponent as PhotoIcon } from '../../../assets/Photo.svg';
import {
  GetMaterialByIdentifierQuery,
  useDonateBookMutation,
} from '@mimir/apollo-client';
import { useAppSelector } from '../../hooks/useTypedSelector';
import Button from '../Button';
import Modal from '../Modal';
import SuccessMessage from '../SuccesMessage';

const WrapperDonate = styled.section`
  background-color: ${colors.bg_secondary};
  box-shadow: 0 10px 70px rgba(26, 30, 214, 0.08);
  border-radius: ${dimensions.xs_1};
  padding: ${dimensions.base_2};
  margin-top: ${dimensions.xl_2};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const WrapperStyledInput = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
  margin-bottom: ${dimensions.xs_2};
`;

const WrapperInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 18.75rem;
  border: 0.5px solid #bdbdbd;
  border-radius: ${dimensions.xl_3};
  padding: 10px 0 10px ${dimensions.xs_1};
  margin-bottom: ${dimensions.base};
  background: ${colors.bg_secondary};

  :hover {
    border: 0.5px solid ${colors.accent_color};
  }

  :focus {
    border: 0.5px solid ${colors.accent_color};
  }
`;

const WrapperBlockInput = styled.div`
  margin-left: ${dimensions.xl_2};
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  margin: 0 ${dimensions.xs_2};
  color: ${colors.main_black};

  ::placeholder {
    color: #bdbdbd;
    font-size: ${dimensions.base};
    line-height: ${dimensions.xl};
  }

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
`;

const WrapperMainInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

const WrapperDescription = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  margin-top: ${dimensions.xl_2};
`;

const StyledDescription = styled.label`
  font-weight: 500;
  font-size: ${dimensions.base};
  color: ${colors.main_black};
  line-height: ${dimensions.xl};
  margin-bottom: ${dimensions.base};
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  resize: none;
  height: 14.5rem;
  padding: ${dimensions.base} ${dimensions.xl_2};
  border-radius: ${dimensions.xl_3};
  border: 1px solid ${colors.gray_additional};
  outline: none;
  color: ${colors.main_black};
  font-weight: 400;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  :focus {
    border: 1px solid ${colors.accent_color};
  }
  ::placeholder {
    color: #bdbdbd;
    font-weight: 300;
  }
`;

const WrapperButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  width: 100%;
`;

const WrapperWithoutButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const StyledButton = styled(Button)`
  max-width: 16.875rem;
  width: 100%;
  :first-of-type {
    margin-bottom: ${dimensions.xs_2};
  }
  :disabled {
    cursor: auto;
    background-color: ${colors.dropdown_gray};
  }
`;

const WrapperUploadFile = styled.div`
  width: 12.25rem;
  height: 20.5rem;
  border: ${colors.accent_color};
  border-radius: ${dimensions.xs_1};
  background-color: #f9faff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${dimensions.tablet_width}) {
    width: 8rem;
  }

  @media (max-width: ${dimensions.phone_width}) {
    width: 6rem;
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
`;

const StyledImg = styled.img`
  height: 20.5rem;
  width: 12.3rem;
  border-radius: ${dimensions.xs_1};
  cursor: pointer;
`;

interface IDataOfBook {
  title: string;
  author: string;
  genre: string;
  identifier: string;
}

interface IPropsDonateBook {
  data: GetMaterialByIdentifierQuery;
}
const DonateBook: FC<IPropsDonateBook> = ({ data }) => {
  const { identifier } = useAppSelector((state) => state.identifier);
  const ref = useRef<HTMLInputElement | null>(null);
  const { id, location } = useAppSelector((state) => state.user);
  const [file, setFile] = useState<File | null>(null);
  const [pictureOfCover, setPictureOfCover] = useState('');
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [dataOfBook, setDataOfBook] = useState<IDataOfBook>({
    author: '',
    genre: '',
    title: '',
    identifier: '',
  });

  useEffect(() => {
    if (data) {
      const { author, title, picture, category } = data.getMaterialByIdentifier;
      setDataOfBook({ title, genre: category, author, identifier });
    }
  }, []);

  const [donateBook, { error }] = useDonateBookMutation();

  const isInvalid =
    !dataOfBook.author ||
    !dataOfBook.title ||
    !dataOfBook.genre ||
    !dataOfBook.identifier ||
    !description;

  const deleteFile = async (fileName: string) => {
    const onlyFileName = fileName.split('/').pop();
    try {
      const response = await axios.delete(
        `${process.env['NX_API_ROOT_URL']}/api/file/delete/${onlyFileName}`
      );
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  };

  const getFile = async (formData: any) => {
    try {
      const response = await axios.post(
        `${process.env['NX_API_ROOT_URL']}/api/file/create`,
        formData
      );
      setPictureOfCover(response.data);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        style: { backgroundColor: '#FFF5F5' },
      });
    }
  }, [error]);

  useEffect(() => {
    const operationWithFiles = async () => {
      const formData = new FormData();
      if (file && !pictureOfCover) {
        formData.append('file', file);
        await getFile(formData);
      }
      if (pictureOfCover) {
        formData.append('file', file!);
        await deleteFile(pictureOfCover);
        await getFile(formData);
        formData.delete('file');
      }
    };
    operationWithFiles();
  }, [file]);

  const handleChangeFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files;
      if (!fileList) return;
      setFile(fileList[0]);
    },
    [file]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataOfBook({ ...dataOfBook, [name]: value });
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const { author, title, genre, identifier } = dataOfBook;
      await donateBook({
        variables: {
          person_id: id,
          picture: pictureOfCover,
          title,
          author,
          identifier,
          type: 'Book',
          description,
          category: genre,
          location_id: Number(location.id),
          id_type: 'ISBN',
        },
      });
      setSuccess(true);
    } catch (e) {
      console.log(e);
    } finally {
      setPictureOfCover('');
      setFile(null);
      setDescription('');
      setDataOfBook({ genre: '', title: '', author: '', identifier: '' });
    }
  };

  return (
    <>
      <WrapperDonate>
        <Form onSubmit={handleSubmit}>
          <WrapperMainInfo>
            <WrapperWithoutButtons>
              <div>
                {pictureOfCover ? (
                  <div>
                    <StyledImg
                      onClick={() => ref?.current?.click()}
                      src={
                        process.env['NX_API_ROOT_URL'] + '/' + pictureOfCover
                      }
                      alt="material pictureOfСover"
                    />
                    <input
                      type="file"
                      onChange={handleChangeFile}
                      accept="image/*"
                      style={{ display: 'none' }}
                      ref={ref}
                    />
                    <StyledUploadFile onClick={() => ref?.current?.click()}>
                      {file ? 'Upload new' : 'Upload File'}
                    </StyledUploadFile>
                  </div>
                ) : (
                  <>
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
                    <StyledUploadFile onClick={() => ref?.current?.click()}>
                      {file ? 'Upload new' : 'Upload File'}
                    </StyledUploadFile>
                  </>
                )}
              </div>
              <WrapperBlockInput>
                <WrapperStyledInput>
                  <Label htmlFor="title">Title*</Label>
                  <WrapperInput>
                    <StyledInput
                      type="text"
                      id="title"
                      name="title"
                      value={dataOfBook.title}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </WrapperInput>
                </WrapperStyledInput>
                <WrapperStyledInput>
                  <Label htmlFor="author">Author*</Label>
                  <WrapperInput>
                    <StyledInput
                      type="text"
                      id="author"
                      name="author"
                      value={dataOfBook.author}
                      onChange={handleChange}
                      autoComplete="off"
                      required
                    />
                  </WrapperInput>
                </WrapperStyledInput>
                <WrapperStyledInput>
                  <Label htmlFor="genre">Genre*</Label>
                  <WrapperInput>
                    <StyledInput
                      type="text"
                      id="genre"
                      name="genre"
                      value={dataOfBook.genre}
                      onChange={handleChange}
                      autoComplete="off"
                      required
                    />
                  </WrapperInput>
                </WrapperStyledInput>
                <WrapperStyledInput>
                  <Label htmlFor="identifier">ISBN*</Label>
                  <WrapperInput>
                    <StyledInput
                      type="number"
                      id="identifier"
                      name="identifier"
                      value={dataOfBook.identifier}
                      onChange={handleChange}
                      autoComplete="off"
                      required
                    />
                  </WrapperInput>
                </WrapperStyledInput>
              </WrapperBlockInput>
            </WrapperWithoutButtons>
            <WrapperButtons>
              <StyledButton
                value="Donate item to the library"
                disabled={isInvalid}
                type="submit"
              />
              <StyledButton value="Ask a manger" transparent />
            </WrapperButtons>
          </WrapperMainInfo>
          <WrapperDescription>
            <StyledDescription htmlFor="description">
              Description
            </StyledDescription>
            <StyledTextArea
              id="description"
              value={description}
              onChange={handleChangeDescription}
              placeholder="Enter your text"
              required
            />
          </WrapperDescription>
        </Form>
      </WrapperDonate>
      <Modal setActive={setSuccess} active={isSuccess}>
        <SuccessMessage
          setActive={setSuccess}
          title="You have successfully donated to the library"
          description="Put the book on the nearest free space on the shelf. In case of any problems, our manager will contact you"
        />
      </Modal>
    </>
  );
};

export default DonateBook;
