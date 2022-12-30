import EmptyCover from '../../../assets/MOC-data/EmptyCover.png';
import Button from '../Button';
import Card from '../Card';
import React, { FC } from 'react';
import { StatusTypes } from '@mimir/global-types';
import StatusBadge from '../StatusBadge';
import styled from '@emotion/styled';
import CardSection from './CardSection';
import { colors, dimensions } from '@mimir/ui-kit';
import ButtonLink from '../ButtonLink/ButtonLink';
import { RoutesTypes } from '../../../utils/routes';
import { css } from '@emotion/react';

interface CardViewProps {
  picture: string;
  title: string;
  description: string;
  username: string;
  userId: number;
  status: StatusTypes;
  accept: () => void;
  reject: () => void;
  redirect: () => void;
}

const FooterButtons = styled.div`
  display: flex;
  flex-direction: column;

  > button + button {
    margin-top: 8px;
  }
`;

const Description = styled.span`
  font-weight: 300;
  font-size: ${() => dimensions.base};
  line-height: ${dimensions.xl};
  color: ${() => colors.main_black};
`;

const clickable = css`
  cursor: pointer;
`;

const CardView: FC<CardViewProps> = ({
  picture,
  title,
  description,
  username,
  userId,
  status,
  accept,
  reject,
  redirect,
}) => (
  <Card>
    <Card.Img
      src={picture || EmptyCover}
      onClick={redirect}
      css={clickable}
    ></Card.Img>
    <Card.Title onClick={redirect} css={clickable}>
      {title}
    </Card.Title>
    <Card.Body>
      <CardSection title="Description:">
        <Description>{description}</Description>
      </CardSection>
      <CardSection title="User name:">
        <ButtonLink to={`${RoutesTypes.READERS}/${userId}`}>
          {username}
        </ButtonLink>
      </CardSection>
      {status === StatusTypes.FREE || status === StatusTypes.REJECTED ? (
        <CardSection title="State">
          {status === StatusTypes.FREE && (
            <StatusBadge type="success">Accepted</StatusBadge>
          )}
          {status === StatusTypes.REJECTED && (
            <StatusBadge type="danger">Rejected</StatusBadge>
          )}
        </CardSection>
      ) : null}
    </Card.Body>
    {status === StatusTypes.FREE || status === StatusTypes.REJECTED ? null : (
      <Card.Footer>
        <FooterButtons>
          <Button onClick={() => accept()} value="Accept" />
          <Button transparent={true} onClick={() => reject()} value="Reject" />
        </FooterButtons>
      </Card.Footer>
    )}
  </Card>
);

export default CardView;
