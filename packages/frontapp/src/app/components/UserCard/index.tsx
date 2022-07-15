import BackButton from '../BackButton';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { useGetOnePersonQuery } from '@mimir/apollo-client';
import { mockData } from '../UserList/mockData';
import { t } from 'i18next';
import { IClaimHistory } from '../../models/helperFunctions/claimHistory';
import ClaimHistory from '../ClaimHistory';
import Button from '../Button';
import { ReactComponent as NotifySvg } from '../../../assets/NoNotification.svg';
import { ReactComponent as Block } from '../../../assets/Block.svg';
import ClaimTable from '../ClaimTable';
import Notifications from '../Notifications';

const InlineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 4px;
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
const Description = styled.p<IDescriptionProps>`
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
  margin-left: auto;
  max-width: 276px;
  width: 100%;
  row-gap: 8px;
`;

const UserCard = () => {
  const { id } = useParams();
  const { data: OnePerson, loading } = useGetOnePersonQuery({
    variables: { id: id! },
  });
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
      title: state ? 'User have been unblocked' : 'User have been blocked',
      message: state?.description,
    };
  });

  const sortedNotifications = messages?.concat(states!);

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
          <Button
            value={t('UserCard.BlockUser')}
            secondary
            warning
            transparent
            svgComponent={<Block />}
          ></Button>
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
    </div>
  );
};

export default UserCard;
