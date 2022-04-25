
import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import BookStatus from '../BookStatus';
import bookImage from '../../../assets/MOC-data/BookImage.png';
import {Status} from "@mimir/global-types";

interface IProps {
  src: string;
  title: string;
  description: string;
}

const BookCardWrapper = styled.div`
  height: 19.5rem;
  width: 12rem;
  background-color: ${colors.bg_secondary};
  border-radius: ${dimensions.xs};
  padding: ${dimensions.base};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
`;

const BookImage = styled.img`
  width: 7rem;
  height: 12rem;
  margin-bottom: ${dimensions.xs_2};
`;

const TitleBook = styled.h3`
  max-width: 10rem;
  font-weight: 500;
  font-size: ${dimensions.sm};
  line-height: ${dimensions.base};
  color: ${colors.main_black};
`;

const DescriptionBook = styled.p`
  max-width: 10rem;
  font-weight: 300;
  font-size: ${dimensions.sm};
  line-height: ${dimensions.base};
  color: ${colors.description_gray};
  margin: ${dimensions.xs_2} auto;
`;

// Fake data
const status: Status = {
  id: "1",
  material_id: "2",
  person_id: "3",
  status: "Busy",
  created_at: "2022-02-04 12:37:50.683849"
}

const BookCard: FC<IBookCard> = ({
  src = '',
  title = '',
  description = '',
}) => {
  return (
    <BookCardWrapper>
      <BookImage src={bookImage} />
      <DescriptionWrapper>
        <TitleBook>{title}</TitleBook>
        <DescriptionBook>{description}</DescriptionBook>
        <BookStatus status={status}/>
      </DescriptionWrapper>
    </BookCardWrapper>
  );
};

export default BookCard;
