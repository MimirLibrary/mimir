import React, { FC } from 'react';
import BookCard from '../BookCard';
import styled from '@emotion/styled';
import { dimensions } from '@mimir/ui-kit';
import { SwiperSlide } from 'swiper/react';
import { GetAllMaterialsQuery } from '@mimir/apollo-client';

const WrapperList = styled.section`
  display: flex;
  gap: ${dimensions.base_2};
  width: 100%;
  flex-wrap: nowrap;
  max-height: 22rem;
  overflow-x: auto;
  ::-webkit-scrollbar {
    height: 0;
  }

  @media (max-width: ${dimensions.phone_width}) {
    gap: ${dimensions.xs_1};
  }
`;

interface IAllBooksListProps {
  items: GetAllMaterialsQuery['getAllMaterials'] | undefined;
  sortingCategory: string | undefined;
  forSlider?: boolean;
}
const AllBooksList: FC<IAllBooksListProps> = ({
  items,
  sortingCategory,
  forSlider,
}) => {
  return !forSlider ? (
    <WrapperList>
      {items &&
        items.map(
          (item) =>
            item?.category === sortingCategory && (
              <BookCard
                key={item?.id}
                id={item?.id}
                src={item?.picture}
                title={item?.title}
                author={item?.author}
                category={item?.category}
                returnDate={item?.currentStatus?.returnDate}
                status={item?.currentStatus?.status}
                claimedUserId={item?.currentStatus?.person_id}
                presentationMode
              />
            )
        )}
    </WrapperList>
  ) : (
    <>
      {items &&
        items.map(
          (item) =>
            item?.category === sortingCategory && (
              <SwiperSlide key={item?.id}>
                <BookCard
                  id={item?.id}
                  src={item?.picture}
                  title={item?.title}
                  author={item?.author}
                  category={item?.category}
                  returnDate={item?.currentStatus?.returnDate}
                  status={item?.currentStatus?.status}
                  claimedUserId={item?.currentStatus?.person_id}
                  presentationMode
                />
              </SwiperSlide>
            )
        )}
    </>
  );
};
AllBooksList.displayName = 'SwiperSlide';

export default AllBooksList;
