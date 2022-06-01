import styled from '@emotion/styled';
import bookImage from '../../../assets/MOC-data/BookImage.png';
import { FC } from 'react';
import { colors, dimensions } from '@mimir/ui-kit';

const BookHolder = styled.div`
  max-width: 62.5rem;
  height: 41rem;
  top: 11.5rem;
  left: 24.5rem;
  border-radius: ${dimensions.xs_1};
  background-color: ${colors.bg_secondary};
  padding: ${dimensions.base_2};
  box-shadow: 0px 10px 70px rgba(26, 30, 214, 0.08);
`;
const BookImage = styled.img`
  display: block-inline;
  width: 12rem;
  height: 19.5rem;
  @media (max-width: ${dimensions.phone_width}) {
    width: 5rem;
    height: 8rem;
    margin-right: ${dimensions.base};
  }
`;

const ShortDescriptionWrapper = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  gap: ${dimensions.xl_2};
`;
const ShortDescription = styled.div`
  width: 23rem;
`;

const TitleBook = styled.h3`
  font-weight: 700;
  margin-bottom: ${dimensions.base_2};
  font-size: ${dimensions.xl};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
`;
const Topic = styled.p`
  margin: ${dimensions.xs_2} 0;
  font-weight: 500;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  color: ${colors.main_black};
`;

const TopicDescription = styled.p`
  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
`;
const StatusInfo = styled.p`
  margin: ${dimensions.base} 0 ${dimensions.xs_2};
  color: ${colors.main_green};
  font-weight: 500;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
`;
const StatusInfoDescription = styled.p`
  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  color: ${colors.description_gray};
`;
const LongDescription = styled.div`
  margin-top: ${dimensions.xl_2};
  grid-column: 1 / span 3;
`;
const OpenLink = styled.a`
  cursor: pointer;
  margin: ${dimensions.xs_2} 0;
  font-weight: 500;
  color: ${colors.accent_color};
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  text-decoration: underline;
`;
const Description = styled.p`
  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
`;
interface IProps {
  src: string | null | undefined;
  title: string | undefined;
  description: string | undefined;
  status: string | null | undefined;
  author: string | undefined;
  category: string | string[] | undefined;
}

const BookInfo: FC<IProps> = ({
  src = '',
  title = '',
  author = '',
  status,
  description = '',
  category,
}) => {
  return (
    <BookHolder>
      <ShortDescriptionWrapper>
        <BookImage src={src || bookImage} />
        <ShortDescription>
          <TitleBook>{title || 'Book Title'}</TitleBook>
          <Topic>Genre: </Topic>
          <OpenLink>{category || 'Genres of book'}</OpenLink>
          <Topic>Author: </Topic>
          <TopicDescription>{author || 'Author Name'}</TopicDescription>
          <StatusInfo> {status || "Book's status"}</StatusInfo>
          <StatusInfoDescription>
            Use the mobile app to claim an item
          </StatusInfoDescription>
        </ShortDescription>
      </ShortDescriptionWrapper>
      <LongDescription>
        <Topic>Description: </Topic>
        <Description>
          {description ||
            ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi impedit aliquid alias consequuntur! Totam sequi expedita sunt dolor obcaecati, iusto ducimus? Beatae ea, commodi ab repellat, corporis atque quasi, tempore sunt modi similique soluta nemo hic necessitatibus esse accusantium omnis neque rerum. Placeat tempore, fugiat unde consequuntur dolor tempora ducimus.'}
        </Description>
        <OpenLink>see full description</OpenLink>
      </LongDescription>
    </BookHolder>
  );
};

export default BookInfo;
