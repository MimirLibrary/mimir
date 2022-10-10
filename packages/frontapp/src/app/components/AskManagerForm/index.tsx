import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Button from '../Button';
import { colors, dimensions } from '@mimir/ui-kit';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { useCreateMessageForManagerMutation } from '@mimir/apollo-client';
import Dropdown from '../Dropdown';
import { TUserLocation } from '../../store/slices/userSlice';
import { toast } from 'react-toastify';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h3`
  font-weight: 700;
  font-size: ${dimensions.xl};
  color: ${colors.main_black};
  line-height: ${dimensions.xl_2};
  margin-bottom: ${dimensions.base};
  text-align: center;
`;

const SubTitle = styled.h5`
  font-size: ${dimensions.base};
  font-weight: 300;
  line-height: ${dimensions.xl};
  color: ${colors.main_black};
  margin-bottom: ${dimensions.base};
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const InputTitle = styled.input`
  width: 100%;
  margin-bottom: ${dimensions.xs_2};
  padding: ${dimensions.base} ${dimensions.xl_2};
  border-radius: ${dimensions.xl_3};
  border: 1px solid ${colors.gray_additional};
  outline: none;
  color: ${colors.main_black};
  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  :focus {
    border: 1px solid ${colors.accent_color};
  }
  ::placeholder {
    color: #bdbdbd;
  }
`;

export const InputDescription = styled.textarea`
  width: 100%;
  resize: none;
  height: 11.25rem;
  padding: ${dimensions.base} ${dimensions.xl_2};
  border-radius: ${dimensions.xl_3};
  border: 1px solid ${colors.gray_additional};
  outline: none;
  color: ${colors.main_black};
  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  margin-bottom: ${dimensions.base};
  :focus {
    border: 1px solid ${colors.accent_color};
  }
  ::placeholder {
    color: #bdbdbd;
  }
`;

const WrapperButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  button {
    :first-of-type {
      margin-right: ${dimensions.base};
    }
  }
`;

const WrapperLocation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const RestyledDropdown = styled(Dropdown)`
  max-width: 50%;
  width: 100%;
  margin-left: ${dimensions.xs_2};
  margin-bottom: 0.5rem;
  padding: 1.6rem 1rem;
  border: 1px solid ${colors.gray_additional};
`;

interface IPropsAskManagerForm {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  material_id?: number | null;
  location_id?: number;
}

const AskManagerForm: FC<IPropsAskManagerForm> = ({
  setActive,
  material_id = null,
  setSuccessModal,
  location_id,
}) => {
  const { id, locations } = useAppSelector((state) => state.user);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [createMessage, { data }] = useCreateMessageForManagerMutation();
  const [location, setLocation] = useState<null | number>(null);

  useEffect(() => {
    if (data?.createMessageForManager.__typename === 'Message') {
      setActive(false);
      setSuccessModal(true);
    }
    setActive(false);
  }, [data]);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleChangeOption = (option: TUserLocation) => {
    setLocation(parseInt(option.id));
  };

  const closeModal = () => {
    setActive(false);
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await createMessage({
        variables: {
          title,
          message: description,
          person_id: id,
          material_id,
          location_id: location_id || location!,
        },
      });
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
    }
    setDescription('');
    setTitle('');
  };

  return (
    <Wrapper>
      <Title>Ask manager</Title>
      <SubTitle>Tell us the reason for your request</SubTitle>
      <Form onSubmit={onSubmit}>
        <WrapperLocation>
          <InputTitle
            placeholder="Title"
            value={title}
            onChange={handleChangeTitle}
            required
          />
          {!location_id && (
            <RestyledDropdown
              options={locations}
              placeholder="Choose your location"
              onChange={(option) => handleChangeOption(option as TUserLocation)}
            />
          )}
        </WrapperLocation>
        <InputDescription
          placeholder="Description"
          value={description}
          onChange={handleChangeDescription}
          required
        />
        <WrapperButtons>
          <Button
            value="Ok"
            type="submit"
            disabled={!(location_id || location)}
          />
          <Button value="Cancel" transparent onClick={closeModal} />
        </WrapperButtons>
      </Form>
    </Wrapper>
  );
};

export default React.memo(AskManagerForm);
