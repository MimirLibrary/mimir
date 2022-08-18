import React, { FC, useCallback, useState } from 'react';
import AnswerToUser from '../AnswerToUser';
import { t } from 'i18next';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { IField } from '../../types';
import Modal from '../Modal';
import {
  WrapperCard,
  Title,
  Description,
  FieldWrapper,
  FieldTitle,
  InlineWrapper,
  ColumnWrapper,
  FieldOpenLink,
  WrapperFooter,
  StyledIcon,
  NotificationDescription,
  OpenLink,
  FieldDescription,
} from '../ManagerInfoCard';

const InlineFieldDescription = styled(FieldDescription)`
  max-width: 80%;
  order: 0;
  flex-grow: 0;
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
          <ColumnWrapper>
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
          </ColumnWrapper>
          <WrapperFooter>
            <>
              <InlineWrapper>
                {fieldsNotification?.slice(0, 3).map((field) => (
                  <StyledIcon key={field.id} src={field.person.avatar} />
                ))}
                {fieldsNotification!.length > 3 ? (
                  <NotificationDescription>
                    {`+${fieldsNotification!.length - 3} ` +
                      t(`ManagerInfoCard.Description.More`)}
                  </NotificationDescription>
                ) : null}
              </InlineWrapper>
            </>
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
