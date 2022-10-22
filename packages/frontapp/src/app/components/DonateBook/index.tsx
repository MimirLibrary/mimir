import React, { FC, useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import Dropdown, { IDropdownOption } from '../Dropdown';
import { colors, dimensions } from '@mimir/ui-kit';
import {
  GetMaterialFromMetadataQuery,
  useDonateBookMutation,
} from '@mimir/apollo-client';
import { useAppSelector } from '../../hooks/useTypedSelector';
import Button from '../Button';
import Modal from '../Modal';
import SuccessMessage from '../SuccessMessage';
import AskManagerForm from '../AskManagerForm';
import ErrorMessage from '../ErrorMessge';
import { RolesTypes } from '@mimir/global-types';
import FileUpload from '../FielUpload';
import { api } from '../../axios-api/api';
import { listOfGenres } from '../../../assets/SearchConsts';
import { TUserLocation } from '../../store/slices/userSlice';
import { t } from 'i18next';

const WrapperDonate = styled.section`
  background-color: ${colors.bg_secondary};
  box-shadow: 0 10px 70px rgba(26, 30, 214, 0.08);
  border-radius: ${dimensions.xs_1};
  padding: ${dimensions.base_2};
  margin-top: ${dimensions.xl_2};
  position: relative;

  @media (max-width: ${dimensions.tablet_width}) {
    margin-top: ${dimensions.xl};
    padding: ${dimensions.xl_2} ${dimensions.base};
  }
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

  @media (max-width: ${dimensions.tablet_width}) {
    display: block;
    margin-bottom: 0.25rem;
    line-height: ${dimensions.xl};
  }
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
  margin-bottom: ${dimensions.xs_2};
  background: ${colors.bg_secondary};

  :hover {
    border: 0.5px solid ${colors.accent_color};
  }

  :focus {
    border: 0.5px solid ${colors.accent_color};
  }

  @media (max-width: ${dimensions.tablet_width}) {
    margin-bottom: ${dimensions.base};
    max-width: 100%;
  }
`;

const WrapperBlockInput = styled.div`
  margin-left: ${dimensions.xl_2};
  width: 100%;
  @media (max-width: 77rem) {
    position: relative;
  }

  @media (max-width: ${dimensions.tablet_width}) {
    position: relative;
    margin-left: 0;
  }
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

  @media (max-width: 77rem) {
    flex-direction: column;
  }

  @media (max-width: ${dimensions.phone_width}) {
    flex-direction: column;
  }
`;

const StyledDropdown = styled(Dropdown)`
  max-width: 300px;
  width: 100%;
  margin-bottom: ${dimensions.xs_2};

  @media (max-width: ${dimensions.tablet_width}) {
    max-width: 100%;
    margin-bottom: ${dimensions.base};
  }
`;

const WrapperDescription = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  margin-top: ${dimensions.xl_2};

  @media (max-width: ${dimensions.tablet_width}) {
    margin-top: 0;
  }
`;

const StyledDescription = styled.label`
  font-weight: 500;
  font-size: ${dimensions.base};
  color: ${colors.main_black};
  line-height: ${dimensions.xl};
  margin-bottom: ${dimensions.base};

  @media (max-width: ${dimensions.tablet_width}) {
    margin-bottom: 0.25rem;
  }
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

  @media (max-width: 77rem) {
    height: 10.5rem;
    margin-bottom: 4rem;
  }
  @media (max-width: ${dimensions.tablet_width}) {
    height: 10.5rem;
    margin-bottom: 4rem;
    border-radius: ${dimensions.base};
  }
`;

const WrapperButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  width: 100%;

  @media (max-width: 77rem) {
    position: absolute;
    bottom: 0;
    left: 50%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transform: translate(-50%, -50%);
    padding: 0 ${dimensions.xs_2};
  }
  @media (max-width: ${dimensions.phone_width}) {
    position: absolute;
    bottom: 0;
    left: 50%;
    flex-direction: row;
    align-items: center;
    transform: translate(-50%, -50%);
  }
`;

const WrapperWithoutButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;

  @media (max-width: ${dimensions.tablet_width}) {
    flex-direction: column;
    align-items: center;
    gap: ${dimensions.xl_2};
  }
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

  @media (max-width: 77rem) {
    max-width: 16.875rem;
    :first-of-type {
      margin-bottom: 0;
      margin-right: 1rem;
    }
  }

  @media (max-width: ${dimensions.phone_width}) {
    max-width: 10.875rem;
    :first-of-type {
      margin-bottom: 0;
      margin-right: 1rem;
    }
  }
`;

interface IDataOfBook {
  title: string | null | undefined;
  author: string | null | undefined;
  genre: string | null | undefined;
}

interface IPropsDonateBook {
  data?: GetMaterialFromMetadataQuery | null | undefined;
  onHideContent: () => void;
}
const DonateBook: FC<IPropsDonateBook> = ({ data, onHideContent }) => {
  const { id, userRole, locations } = useAppSelector((state) => state.user);
  const { identifier } = useAppSelector((state) => state.identifier);
  const [file, setFile] = useState<File | null>(null);
  const [pictureOfCover, setPictureOfCover] = useState<string | null>(null);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [description, setDescription] = useState<string | undefined | null>('');
  const [isAskManager, setIsAskManager] = useState<boolean>(false);
  const [sendManagerSuccess, setSendManagerSuccess] = useState<boolean>(false);
  const [locationId, setLocationId] = useState<null | number>(null);

  const [dataOfBook, setDataOfBook] = useState<IDataOfBook>({
    author: '',
    genre: '',
    title: '',
  });

  const [donateBook, { error, data: donateData }] = useDonateBookMutation();

  const isInvalid =
    !dataOfBook.author ||
    !dataOfBook.title ||
    !dataOfBook.genre ||
    !description ||
    !locationId;

  const deleteFile = async (fileName: string) => {
    const onlyFileName = fileName.split('/').pop();
    try {
      const response = await api.delete(`file/delete/${onlyFileName}`);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  };

  const getFile = async (formData: any) => {
    try {
      const response = await api.post('file/create', formData);
      setPictureOfCover(response.data);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  };

  useEffect(() => {
    if (data) {
      setDataOfBook({
        title: data?.getMaterialByIdentifierFromMetadata?.material?.title,
        genre:
          data?.getMaterialByIdentifierFromMetadata?.material?.meta?.series,
        author: data?.getMaterialByIdentifierFromMetadata?.material?.authors
          ?.map((item) => item?.name)
          .join('/'),
      });
      setDescription(
        data?.getMaterialByIdentifierFromMetadata?.material?.description
      );
      if (data?.getMaterialByIdentifierFromMetadata?.material?.cover)
        setPictureOfCover(
          data.getMaterialByIdentifierFromMetadata.material.cover
        );
    }
  }, []);

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

  useEffect(() => {
    if (donateData) {
      setSuccess(true);
    }
  }, [donateData]);

  const handleChangeFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files;
      if (!fileList) return;
      setFile(fileList[0]);
    },
    [file]
  );

  const handleChangeLocation = (option: TUserLocation) => {
    setLocationId(Number(option.id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataOfBook({ ...dataOfBook, [name]: value });
  };

  const handleChangeGenre = (option: IDropdownOption) => {
    setDataOfBook({ ...dataOfBook, genre: option.value });
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleShowAskManagerForm = useCallback(() => {
    setIsAskManager(true);
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const { author, title, genre } = dataOfBook;
      await donateBook({
        variables: {
          person_id: id,
          picture: pictureOfCover,
          title: title!,
          author: author!,
          identifier,
          type: 'Book',
          description,
          category: genre!,
          location_id: locationId!,
          id_type: data?.getMaterialByIdentifierFromMetadata?.idType || 'ISBN',
          role: userRole,
          is_donated: true,
        },
      });
    } catch (e) {
      console.log(e);
    } finally {
      setPictureOfCover('');
      setFile(null);
      setDescription('');
      setDataOfBook({ genre: '', title: '', author: '' });
      setLocationId(null);
    }
  };

  return (
    <>
      <WrapperDonate>
        <Form onSubmit={handleSubmit}>
          <WrapperMainInfo>
            <WrapperWithoutButtons>
              <div>
                <FileUpload
                  file={file}
                  handleChangeFile={handleChangeFile}
                  pictureOfCover={pictureOfCover}
                />
              </div>
              <WrapperBlockInput>
                <WrapperStyledInput>
                  <Label htmlFor="title">Title*</Label>
                  <WrapperInput>
                    <StyledInput
                      type="text"
                      id="title"
                      name="title"
                      value={dataOfBook.title || ''}
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder="Enter title"
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
                      value={dataOfBook.author || ''}
                      onChange={handleChange}
                      autoComplete="off"
                      required
                      placeholder="Enter author"
                    />
                  </WrapperInput>
                </WrapperStyledInput>
                <Label htmlFor="genre">Genre*</Label>
                <StyledDropdown
                  options={listOfGenres}
                  onChange={handleChangeGenre}
                  placeholder="Enter genre"
                />
                <Label htmlFor="location">Location*</Label>
                <StyledDropdown
                  options={locations}
                  onChange={(option) =>
                    handleChangeLocation(option as TUserLocation)
                  }
                  placeholder="Choose your location"
                />
              </WrapperBlockInput>
            </WrapperWithoutButtons>
            <WrapperButtons>
              <StyledButton
                value="Add item to library"
                disabled={isInvalid}
                type="submit"
              />
              <StyledButton
                value={t(`Cancel`)}
                transparent
                onClick={onHideContent}
              />
              {userRole !== RolesTypes.MANAGER && (
                <StyledButton
                  value="Ask a manger"
                  transparent
                  onClick={handleShowAskManagerForm}
                />
              )}
            </WrapperButtons>
          </WrapperMainInfo>
          <WrapperDescription>
            <StyledDescription htmlFor="description">
              Description*
            </StyledDescription>
            <StyledTextArea
              id="description"
              value={description || ''}
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
          onCloseContentDonate={onHideContent}
        />
      </Modal>
      <Modal active={isAskManager} setActive={setIsAskManager}>
        <AskManagerForm
          setActive={setIsAskManager}
          setSuccessModal={setSendManagerSuccess}
        />
      </Modal>
      <Modal active={sendManagerSuccess} setActive={setSendManagerSuccess}>
        <ErrorMessage
          title="We reported the problem to the manager"
          message="The problem will be solved soon"
          titleCancel="Ok"
          setActive={setSendManagerSuccess}
          activeAskManager={false}
        />
      </Modal>
    </>
  );
};

export default React.memo(DonateBook);
