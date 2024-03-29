import React, { FC, useEffect, useMemo } from 'react';
import bookImage from '../../../assets/MOC-data/BookImage.png';
import { WrapperInput } from '../Search';
import { RolesTypes } from '@mimir/global-types';
import { listOfGenres } from '../../../assets/SearchConsts';
import { TUserLocation } from '../../store/slices/userSlice';
import BookStatus from '../BookStatus';
import styled from '@emotion/styled';
import { colors, dimensions } from '@mimir/ui-kit';
import { useAppSelector } from '../../hooks/useTypedSelector';
import Dropdown, { IDropdownOption } from '../Dropdown';
import { useGetAllLocationsQuery } from '@mimir/apollo-client';
import { INewData, Location, OpenLink, TitleHolder, Topic } from './index';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';
import Days from './Days';
import { RoutesTypes } from '../../../utils/routes';
import { t } from 'i18next';

export const WrapperInfo = styled.div`
  display: flex;
  gap: ${dimensions.xl_2};

  @media (max-width: ${dimensions.wide_laptop_width}) {
    width: 100%;
    flex-flow: wrap row;
  }

  @media (max-width: ${dimensions.phone_width}) {
    flex-direction: column;
  }
`;

export const BookImage = styled.img`
  display: inline-block;
  width: 12rem;
  height: 19.5rem;
  border-radius: 10px;

  @media (max-width: ${dimensions.wide_laptop_width}) {
    justify-self: center;
  }

  @media (max-width: ${dimensions.phone_width}) {
    align-self: center;
  }
`;

export const ShortDescription = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  > * {
    margin: 0;
  }
`;

const StyledInput = styled.input`
  width: 19rem;
  border: none;
  outline: none;
  margin-left: ${dimensions.xs_2};
  color: ${colors.main_black};
  margin-right: 0.12rem;

  @media (max-width: ${dimensions.phone_width}) {
    width: 100%;
  }
`;

export const TitleBook = styled.h3`
  font-weight: 700;
  margin-bottom: ${dimensions.xl_2};
  font-size: ${dimensions.xl};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
  @media (max-width: ${dimensions.phone_width}) {
    display: flex;
    justify-content: center;
    margin-bottom: 0;
  }
`;

const WrapperDropDown = styled.div`
  margin-top: ${dimensions.base};
  width: 21.5rem;

  @media (max-width: ${dimensions.wide_laptop_width}) {
    width: 100%;
  }
`;

const RestyledDropdown = styled(Dropdown)`
  margin-top: ${dimensions.xs_2};
  max-width: 21.5rem;
  width: 100%;

  @media (max-width: ${dimensions.laptop_width}) {
    max-width: 100%;
  }
`;

export const TopicDescription = styled.p`
  font-weight: 300;
  font-size: ${dimensions.base};
  line-height: ${dimensions.xl};
  color: ${colors.main_black};
`;

const StyledStatus = styled.div`
  font-size: ${dimensions.base};
`;

const DeadlineInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledInputDeadline = styled.input`
  border: 0.5px solid #bdbdbd;
  border-radius: ${dimensions.xl_3};
  width: 3.7rem;
  outline: none;
  padding: 10px 0 10px 0;
  background: ${colors.bg_secondary};
  margin-right: ${dimensions.xs_1};
  text-align: center;

  :hover {
    border: 0.5px solid ${colors.accent_color};
  }

  :focus {
    border: 0.5px solid ${colors.accent_color};
  }

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

interface IDescriptionBook {
  editing: boolean;
  src: string | null;
  title: string;
  category: string | undefined;
  author: string;
  status: string | undefined;
  date: Date;
  returnDate?: string;
  location: Location;
  newTitleAndAuthor: INewData;
  claimDuration: number;
  claimedUserId?: number;
  handleChangeDeadline: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeLocation: (option: TUserLocation) => void;
  handleChangeAuthorAndTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeNewGenre: (e: IDropdownOption) => void;
}

const DescriptionBook: FC<IDescriptionBook> = ({
  editing,
  src,
  location,
  category,
  date,
  returnDate,
  status,
  title,
  author,
  newTitleAndAuthor,
  claimDuration,
  claimedUserId,
  handleChangeLocation,
  handleChangeNewGenre,
  handleChangeDeadline,
  handleChangeAuthorAndTitle,
}) => {
  const { userRole } = useAppSelector((state) => state.user);
  const isPhone = useMediaQuery({ maxWidth: dimensions.phone_width });
  const isLaptop = useMediaQuery({ maxWidth: dimensions.wide_laptop_width });

  const { data: allLocations, error: errorLocations } = useGetAllLocationsQuery(
    {
      skip: userRole === RolesTypes.READER,
    }
  );

  useEffect(() => {
    if (errorLocations) {
      toast.error(errorLocations.message);
    }
  }, [errorLocations]);

  const currentGenreIndex = useMemo(
    () => listOfGenres.findIndex((genre) => genre.value === category),
    [category, listOfGenres]
  );

  const currentLocationIndex = useMemo(
    () =>
      allLocations?.getAllLocations.findIndex((loc) => loc!.id === location.id),
    [allLocations]
  );

  return (
    <WrapperInfo data-testid="description-book">
      <BookImage src={src || bookImage} />
      <ShortDescription>
        {editing ? (
          <>
            <TitleHolder>{t('DonateItem.Inputs.Name.Title')}</TitleHolder>
            <WrapperInput isFullWidth={isPhone || isLaptop}>
              <StyledInput
                type="text"
                value={newTitleAndAuthor.newTitle}
                name="newTitle"
                onChange={handleChangeAuthorAndTitle}
              />
            </WrapperInput>
          </>
        ) : (
          <TitleBook>{title || 'Book Title'}</TitleBook>
        )}
        {!editing && <Topic>{t('DonateItem.Inputs.Genre.Title')}: </Topic>}
        {userRole === RolesTypes.READER ? (
          <OpenLink to={`${RoutesTypes.CATEGORY}?categories=${category || ''}`}>
            {category || 'Genres of book'}
          </OpenLink>
        ) : editing ? (
          <WrapperDropDown>
            <TitleHolder>{t('DonateItem.Inputs.Genre.Title')}</TitleHolder>
            <RestyledDropdown
              options={listOfGenres}
              initIndex={currentGenreIndex}
              onChange={handleChangeNewGenre}
              placeholder="Enter genre"
            />
          </WrapperDropDown>
        ) : (
          <TopicDescription>{category || 'Genres of book'}</TopicDescription>
        )}
        {editing ? (
          <>
            <br />
            <TitleHolder>{t('DonateItem.Inputs.Author.Title')}</TitleHolder>
            <WrapperInput isFullWidth={isPhone || isLaptop}>
              <StyledInput
                type="text"
                name="newAuthor"
                value={newTitleAndAuthor.newAuthor}
                onChange={handleChangeAuthorAndTitle}
              />
            </WrapperInput>
          </>
        ) : (
          <>
            <Topic>{t('DonateItem.Inputs.Author.Title')}: </Topic>
            <TopicDescription>{author || 'Author Name'}</TopicDescription>
          </>
        )}
        {userRole === RolesTypes.READER ? (
          <>
            <Topic>{t('DonateItem.Inputs.State')}: </Topic>
            <StyledStatus>
              <BookStatus
                fontSize={dimensions.base}
                status={status}
                returnDate={returnDate}
                claimedUserId={claimedUserId}
              />
            </StyledStatus>
          </>
        ) : editing ? (
          <>
            <br />
            <TitleHolder>{t('DonateItem.Inputs.Deadline')} </TitleHolder>
            <DeadlineInputWrapper>
              <StyledInputDeadline
                value={claimDuration}
                type="number"
                onChange={handleChangeDeadline}
                min="1"
                max="31"
              />
              <Days number={claimDuration} />
            </DeadlineInputWrapper>
          </>
        ) : (
          <>
            <Topic>{t('DonateItem.Inputs.Deadline')}: </Topic>
            <TopicDescription>
              {claimDuration + ' '}
              <Days number={claimDuration} />
            </TopicDescription>
          </>
        )}
        <>
          {editing ? (
            <WrapperDropDown>
              <TitleHolder>
                {t('DonateItem.Inputs.Location.Title')}{' '}
              </TitleHolder>
              <RestyledDropdown
                options={allLocations!.getAllLocations.map((loc) => ({
                  id: loc!.id,
                  value: loc!.location,
                }))}
                initIndex={currentLocationIndex}
                onChange={(option) =>
                  handleChangeLocation(option as TUserLocation)
                }
              />
            </WrapperDropDown>
          ) : (
            <>
              <Topic>{t('DonateItem.Inputs.Location.Title')}: </Topic>
              <TopicDescription>{location.location}</TopicDescription>
            </>
          )}
        </>
      </ShortDescription>
    </WrapperInfo>
  );
};

export default DescriptionBook;
