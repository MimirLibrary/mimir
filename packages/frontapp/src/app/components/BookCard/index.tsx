import { FC } from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import bookImage from '../../../assets/MOC-data/EmptyCover.png';
import { useNavigate } from 'react-router-dom';
import { DateTime } from '@mimir/global-types';
import BookStatus from '../BookStatus';
import { shortenText } from '../../../helpers/common';
export interface IBookCardProps {
  src?: string | null;
  title?: string;
  date?: DateTime;
  status?: string | null;
  author?: string;
  category?: string;
  id?: string;
  presentationMode?: boolean;
}

const BookCardWrapper = styled.div<Pick<IBookCardProps, 'presentationMode'>>`
  flex-shrink: 0;
  width: 12rem;
  background-color: ${colors.bg_secondary};
  border-radius: ${dimensions.xs};
  padding: ${dimensions.base};
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: box-shadow 0.3s;

  :hover {
    box-shadow: 0 6px 14px -6px rgba(24, 39, 75, 0.08),
      0px 10px 32px -4px rgba(24, 39, 75, 0.08);
  }

  @media (max-width: ${dimensions.phone_width}) {
    max-width: ${({ presentationMode }) =>
      !presentationMode ? `100%` : `8.75rem`};
    flex-direction: ${({ presentationMode }) =>
      !presentationMode ? 'row' : `column`};
    gap: ${({ presentationMode }) => (!presentationMode ? dimensions.base : 0)};
    width: 100%;
    padding: ${dimensions.xs_1};
    align-items: center;
  }
`;

const DescriptionWrapper = styled.div<Pick<IBookCardProps, 'presentationMode'>>`
  display: flex;
  justify-content: start;
  flex-direction: column;

  @media (max-width: ${dimensions.phone_width}) {
    align-self: start;

    & p {
      font-size: ${({ presentationMode }) =>
        !presentationMode ? dimensions.sm : dimensions.xs};
    }
  }
`;

const BookImage = styled.img<Pick<IBookCardProps, 'presentationMode'>>`
  width: 7rem;
  height: 12rem;
  margin-bottom: ${dimensions.xs_2};
  align-self: center;
  @media (max-width: ${dimensions.phone_width}) {
    display: block;
    width: ${({ presentationMode }) => (!presentationMode ? '5rem' : `7.5rem`)};
    height: ${({ presentationMode }) =>
      !presentationMode ? '8.125rem' : `11.25rem`};
    margin-bottom: ${({ presentationMode }) =>
      !presentationMode ? 0 : dimensions.xs_2};
  }
`;

const TitleBook = styled.h3<Pick<IBookCardProps, 'presentationMode'>>`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 10rem;
  font-weight: 500;
  font-size: ${dimensions.sm};
  line-height: ${dimensions.base};
  color: ${colors.main_black};

  @media (max-width: ${dimensions.phone_width}) {
    font-size: ${({ presentationMode }) =>
      !presentationMode ? dimensions.base : dimensions.xs};
    white-space: normal;
  }
`;

const DescriptionBook = styled.p<Pick<IBookCardProps, 'presentationMode'>>`
  max-width: 10rem;
  font-weight: 300;
  font-size: ${dimensions.sm};
  line-height: ${dimensions.base};
  color: ${colors.description_gray};
  margin: ${dimensions.xs_2} 0;

  @media (max-width: ${dimensions.phone_width}) {
    max-width: 100%;
    margin: 0.25rem 0;
    font-size: ${({ presentationMode }) =>
      !presentationMode ? dimensions.sm : dimensions.xs};
  }
`;

const BookCard: FC<IBookCardProps> = ({
  src = '',
  title = '',
  author = '',
  status,
  category,
  date,
  id,
  presentationMode,
}) => {
  const navigate = useNavigate();
  const handleItemRedirect = () => {
    navigate(`/item/${id}`);
  };

  return (
    <BookCardWrapper
      presentationMode={presentationMode}
      onClick={handleItemRedirect}
      data-testid="bookCard"
    >
      <BookImage
        presentationMode={presentationMode}
        src={src || bookImage}
        data-testid="bookImage"
      />
      <DescriptionWrapper presentationMode={presentationMode}>
        <TitleBook presentationMode={presentationMode} data-testid="bookTitle">
          {title}
        </TitleBook>
        <DescriptionBook presentationMode={presentationMode}>
          {shortenText(author, 20)}
        </DescriptionBook>
        <BookStatus status={status} date={date} />
      </DescriptionWrapper>
    </BookCardWrapper>
  );
};

export default BookCard;
