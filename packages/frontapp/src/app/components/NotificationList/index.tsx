import React, { FC, useCallback, useState } from 'react';
import AnswerToUser from '../AnswerToUser';
import { t } from 'i18next';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { Link } from 'react-router-dom';
import { IField } from '../../types';
import Modal from '../Modal';

const WrapperCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${colors.bg_secondary};
  height: inherit;
  width: 100%;
  box-shadow: ${colors.shadow};
  border-radius: ${dimensions.xs_1};
  padding: ${dimensions.xl_2} ${dimensions.xl_2} ${dimensions.xl_3}
    ${dimensions.xl_2};
`;

const Title = styled.p`
  font-weight: 700;
  font-size: ${dimensions.xl_2};
  line-height: ${dimensions.xl_3};
  color: ${colors.main_black};
`;

const FieldTitle = styled.p`
  font-weight: 600;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  color: ${colors.main_black};
`;

const Description = styled.p`
  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
`;

const FieldDescription = styled.p`
  display: flex;
  font-weight: 400;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  color: ${colors.main_black};
`;

const InlineFieldDescription = styled(FieldDescription)`
  max-width: 80%;
  order: 0;
  flex-grow: 0;
`;

const WrapperFooter = styled.div`
  order: 4;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  bottom: ${dimensions.xs_1};
  justify-content: space-between;
`;
export const OpenLink = styled(Link)`
  cursor: pointer;
  font-weight: 500;
  color: ${colors.accent_color};
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  width: 120px;
  text-align: right;
  text-decoration: underline;
`;

const ButtonAnswer = styled.button`
  flex: none;
  outline: none;
  border: none;
  background: transparent;
  text-decoration: underline;
  color: ${colors.accent_color};
  font-size: ${dimensions.base};
  position: absolute;
  right: 71px;
  order: 1;
  flex-grow: 0;
  text-align: center;
  cursor: pointer;
  @media (max-width: ${dimensions.tablet_width}) {
    position: static;
    display: block;
    text-align: center;
  }
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
  order: 3;
  flex-grow: 0;
  height: auto;
  padding: ${dimensions.base} 0px ${dimensions.base} ${dimensions.base};
  gap: ${dimensions.xs_2};
  background: ${colors.bg_fields};
  border-radius: ${dimensions.xs_1};
`;
const InlineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface IFieldOpenLinkProps {
  secondary?: string;
}
const FieldOpenLink = styled.span<IFieldOpenLinkProps>`
  font-weight: 400;
  width: auto;
  margin-left: 4px;
  text-decoration: underline;
  color: ${({ secondary }) =>
    secondary ? colors.problem_red : colors.accent_color};
`;

const StyledIcon = styled.img`
  width: ${dimensions.base_3};
  height: ${dimensions.base_3};
  border-radius: 50%;
  border: 2px solid ${colors.bg_secondary};
  position: relative;
  :nth-of-type(2) {
    left: -16px;
  }
  :nth-of-type(3) {
    left: -32px;
  }
`;
const NotificationDescription = styled(FieldDescription)`
  position: relative;
  font-weight: 500;
  font-size: ${dimensions.sm};
  left: -16px;
  align-self: center;
`;

const answers = [
  'You have missed the due date for your book. Return it as soon as possible or contact the manager in room 35',
  'We have accepted your donation to the library! Thank you!',
  "If you don't check out all expired items in the library within a week, you will be banned from the app",
];

interface NotificationList {
  fieldsNotification: IField[] | null | undefined;
}

interface IDataOfMessage {
  id: string;
  person_id: string;
}

const NotificationList: FC<NotificationList> = ({ fieldsNotification }) => {
  const [isAnswerModal, setIsAnswerModal] = useState<boolean>(false);
  const [dataOfMessage, setDataOfMessage] = useState<IDataOfMessage | null>(
    null
  );

  const handleAnswerModal = useCallback(
    (dataOfMessage: IDataOfMessage) => {
      setDataOfMessage(dataOfMessage);
      setIsAnswerModal(true);
    },
    [dataOfMessage]
  );

  const handleClose = useCallback(() => {
    setIsAnswerModal(false);
  }, []);

  return (
    <>
      {fieldsNotification && (
        <WrapperCard>
          <Title>
            {t(`ManagerInfoCard.Title.Notifications`) +
              ` — (${fieldsNotification?.length})`}
          </Title>
          <Description>
            {t(`ManagerInfoCard.Description.Notifications`)}
          </Description>
          {fieldsNotification?.slice(0, 3).map((field) => (
            <FieldWrapper key={field.id}>
              <>
                <FieldTitle>{field.title}</FieldTitle>
                <InlineWrapper>
                  <InlineFieldDescription>
                    {field.message}
                  </InlineFieldDescription>
                  <ButtonAnswer
                    onClick={() =>
                      handleAnswerModal({
                        id: field.id,
                        person_id: field.person.id,
                      })
                    }
                  >
                    {t('ManagerInfoCard.Link.Answer')}
                  </ButtonAnswer>
                </InlineWrapper>
                <FieldOpenLink>{field.person.username}</FieldOpenLink>
              </>
            </FieldWrapper>
          ))}
          <WrapperFooter>
            <InlineWrapper>
              {fieldsNotification?.slice(0, 3).map((field) => (
                <StyledIcon key={field.id} src={field.person.avatar} />
              ))}
              {fieldsNotification.length || 0 > 3 ? (
                <NotificationDescription>
                  {`+${fieldsNotification.length || 0 - 3} ` +
                    t(`ManagerInfoCard.Description.More`)}
                </NotificationDescription>
              ) : null}
            </InlineWrapper>
            <OpenLink to="/notifications">
              {t(`ManagerInfoCard.Link.Notifications`)}
            </OpenLink>
          </WrapperFooter>
        </WrapperCard>
      )}
      <Modal active={isAnswerModal} setActive={setIsAnswerModal}>
        {isAnswerModal && (
          <AnswerToUser
            id={dataOfMessage?.id}
            person_id={dataOfMessage?.person_id}
            answers={answers}
            close={handleClose}
          />
        )}
      </Modal>
    </>
  );
};

export default React.memo(NotificationList);
