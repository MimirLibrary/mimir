import BackButton from '../BackButton';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import {
  GetOnePersonDocument,
  useCreateStateMutation,
  useGetOnePersonQuery,
} from '@mimir/apollo-client';
import { mockData } from '../UserList/mockData';
import { t } from 'i18next';
import { IClaimHistory } from '../../models/helperFunctions/claimHistory';
import ClaimHistory from '../ClaimHistory';
import Button from '../Button';
import { ReactComponent as NotifySvg } from '../../../assets/NoNotification.svg';
import { ReactComponent as Block } from '../../../assets/Block.svg';
import ClaimTable from '../ClaimTable';
import Notifications from '../Notifications';
import Modal from '../Modal';
import ErrorMessage from '../ErrorMessge';
import React, { useState } from 'react';
import { InputDescription } from '../AskManagerForm';

const InlineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 4px;
  align-items: center;
`;
const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: inherit;
`;

const CardWrapper = styled(InlineWrapper)`
  background: ${colors.bg_secondary};
  height: 250px;
  width: auto;
  box-shadow: ${colors.shadow};
  border-radius: 10px;
  padding: 32px;
`;

const Avatar = styled.img`
  display: flex;
  width: 115px;
  height: 186px;
  object-fit: cover;
`;

const DescriptionWrapper = styled(ColumnWrapper)`
  margin-left: 24px;
  font-size: ${dimensions.base};
  row-gap: 8px;
`;

interface IDescriptionProps {
  bold?: boolean;
  titlee?: boolean;
  small?: boolean;
}
export const Description = styled.p<IDescriptionProps>`
  font-weight: ${({ bold, titlee }) => (bold ? (titlee ? 700 : 500) : 300)};
  font-size: ${({ titlee }) =>
    titlee ? `${dimensions.xl_2}` : `${dimensions.base}`};
  line-height: ${({ titlee }) =>
    titlee ? `${dimensions.xl_2}` : `${dimensions.xl}`};
  margin-bottom: ${({ titlee }) => (titlee ? dimensions.base : null)};
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: ${dimensions.xl_2};
  margin-bottom: ${dimensions.base};
  margin-top: ${dimensions.base_2};
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: auto;
  margin-left: auto;
  max-width: 276px;
  width: 100%;
  row-gap: 8px;
`;

const RadioButton = styled.input`
  display: flex;
  margin-left: auto;
  margin-right: 414px;
  appearance: none;
  border: 1px solid ${colors.main_gray};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  &:checked {
    background-color: ${colors.accent_color};
    outline-offset: -5px;
    outline: 4px solid ${colors.bg_secondary};
    border-color: ${colors.accent_color};
  }
  &:hover {
    border: 1px solid ${colors.description_gray};
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: ${dimensions.base};
`;

const UserCard = () => {
  const { id } = useParams();
  const { data: OnePerson, loading } = useGetOnePersonQuery({
    variables: { id: id! },
  });
  const [setState] = useCreateStateMutation({
    refetchQueries: [GetOnePersonDocument],
  });
  const [checkedButton, setCheckedButton] = useState<number>(0);
  const [showWarningBlock, setShowWarningBlock] = useState<boolean>(false);
  const [showWarningUnblock, setShowWarningUnblock] = useState<boolean>(false);
  const [showBlockInput, setShowBlockInput] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const messages = OnePerson?.getOnePerson.messages?.map((message) => {
    return {
      type: 'message',
      created_at: message?.created_at,
      title: message!.title,
      message: message?.message,
    };
  });
  const states = OnePerson?.getOnePerson.states?.map((state) => {
    return {
      type: 'block',
      created_at: state?.created_at,
      title: state?.state
        ? 'User have been blocked'
        : 'User have been unblocked',
      message: state?.description ? state?.description : '',
    };
  });

  const sortedNotifications = messages?.concat(states!);

  const handleChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const OpenModal = () => {
    if (state) {
      setShowWarningUnblock(true);
    } else setShowWarningBlock(true);
  };

  const blockSubmit = async () => {
    let sendValue = null;
    switch (checkedButton) {
      case 1:
        sendValue = 'Too many debts';
        break;
      case 2:
        sendValue = 'The user has been fired';
        break;
      case 3:
        sendValue = value;
        break;
    }

    await setState({
      variables: {
        person_id: Number(OnePerson?.getOnePerson.id),
        state: true,
        description: sendValue,
      },
    });
    setShowBlockInput(false);
  };

  const ublockSubmit = async () => {
    await setState({
      variables: {
        person_id: Number(OnePerson?.getOnePerson.id),
        state: false,
      },
    });
    setShowWarningUnblock(false);
  };

  const openInput = () => {
    setShowWarningBlock(false);
    setShowBlockInput(true);
  };

  const state = OnePerson?.getOnePerson.states?.slice().pop()?.state;
  if (loading) return <h1>{t('Loading')}</h1>;

  return (
    <div style={{ marginBottom: '138px' }}>
      <BackButton />
      <CardWrapper>
        <Avatar src={OnePerson?.getOnePerson.avatar || mockData.avatar} />
        <DescriptionWrapper>
          <Description bold titlee>
            {OnePerson?.getOnePerson.username}
          </Description>
          <InlineWrapper>
            <Description bold>{t('UserCard.Position')}</Description>
            <Description>{OnePerson?.getOnePerson.position}</Description>
          </InlineWrapper>
          <InlineWrapper>
            <Description bold>E-mail:</Description>
            <Description>{OnePerson?.getOnePerson.email}</Description>
          </InlineWrapper>
          <ClaimHistory
            statuses={OnePerson?.getOnePerson.statuses as IClaimHistory[]}
          />
        </DescriptionWrapper>
        <ButtonsWrapper>
          <Button
            value={t('UserCard.CreateNotification')}
            svgComponent={<NotifySvg />}
            transparent
          ></Button>
          {state ? (
            <Button
              value={t('UserCard.UnblockUser')}
              secondary
              warning
              onClick={OpenModal}
              svgComponent={<Block />}
            ></Button>
          ) : (
            <Button
              value={t('UserCard.BlockUser')}
              secondary
              warning
              transparent
              onClick={OpenModal}
              svgComponent={<Block />}
            ></Button>
          )}
        </ButtonsWrapper>
      </CardWrapper>
      <Title>{t('UserCard.ClaimList')}</Title>
      <Description>{t('UserCard.ClaimListDescription')}</Description>
      <ClaimTable
        statuses={OnePerson?.getOnePerson.statuses as IClaimHistory[]}
        name={OnePerson?.getOnePerson.username as string}
      />
      {sortedNotifications?.length ? (
        <>
          <Title>{t('UserCard.Notifications')}</Title>
          <Description>{t('UserCard.NotificationsDescription')}</Description>
          <Notifications notifications={sortedNotifications}></Notifications>
        </>
      ) : null}
      <Modal active={showWarningUnblock} setActive={setShowWarningUnblock}>
        <ErrorMessage
          title={t('Block.Warning')}
          message={
            t('Block.SureUnblock') +
            OnePerson?.getOnePerson.username +
            t('Block.InLibrary')
          }
          titleCancel={t('Cancel')}
          setActive={setShowWarningUnblock}
          titleOption={t('Block.YUnblock')}
          onSubmitClick={ublockSubmit}
        />
      </Modal>
      <Modal active={showWarningBlock} setActive={setShowWarningBlock}>
        <ErrorMessage
          title={t('Block.Warning')}
          message={
            t('Block.SureBlock') +
            OnePerson?.getOnePerson.username +
            t('Block.InLibrary')
          }
          titleCancel={t('Cancel')}
          setActive={setShowWarningBlock}
          titleOption={t('Block.YBlock')}
          onSubmitClick={openInput}
        />
      </Modal>
      <Modal active={showBlockInput} setActive={setShowBlockInput}>
        <Form onSubmit={blockSubmit}>
          <Description bold titlee>
            {t('Block.BlockUser')}
          </Description>
          <Description bold>{t('Block.Reason')}</Description>

          <InlineWrapper>
            <Description>{t('Block.TooManyDebts')}</Description>
            <RadioButton
              type={'radio'}
              name={'description'}
              checked={checkedButton === 1}
              onChange={() => setCheckedButton(1)}
            />
          </InlineWrapper>
          <InlineWrapper>
            <Description>{t('Block.Fired')}</Description>
            <RadioButton
              type={'radio'}
              name={'description'}
              checked={checkedButton === 2}
              onChange={() => setCheckedButton(2)}
            />
          </InlineWrapper>
          <InlineWrapper>
            <Description>{t('Block.Other')}</Description>
            <RadioButton
              type={'radio'}
              name={'description'}
              checked={checkedButton === 3}
              onChange={() => setCheckedButton(3)}
            />
          </InlineWrapper>

          <Description bold>{t('Block.FullOther')}</Description>
          <InputDescription
            placeholder={'Enter your message'}
            disabled={checkedButton !== 3}
            value={value}
            onChange={handleChangeValue}
          />
          <InlineWrapper>
            <Button value={t('Block.BlockUser')} type={'submit'} />
            <Button value={t('Cancel')} transparent />
          </InlineWrapper>
        </Form>
      </Modal>
    </div>
  );
};

export default UserCard;
