import React, { FC, useEffect, useMemo, useState } from 'react';
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
import { periodOfKeeping } from '../../models/helperFunctions/converTime';
import { INewData, Location, OpenLink, TitleHolder, Topic } from './index';
import { toast } from 'react-toastify';

export const WrapperInfo = styled.div`
  display: flex;
  @media (max-width: ${dimensions.phone_width}) {
    flex-direction: column;
    align-items: center;
  }
`;

export const BookImage = styled.img`
  display: inline-block;
  width: 12rem;
  height: 19.5rem;
  border-radius: 10px;
  @media (max-width: ${dimensions.phone_width}) {
    margin-right: ${dimensions.base};
  }
`;

export const ShortDescription = styled.div`
  width: 100%;
  margin-left: ${dimensions.xl_2};
  @media (max-width: ${dimensions.phone_width}) {
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
`;

export const TitleBook = styled.h3`
  font-weight: 700;
  margin-bottom: ${dimensions.xl_2};
  font-size: ${dimensions.xl};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
  @media (max-width: ${dimensions.phone_width}) {
    margin-bottom: 0;
    margin-top: ${dimensions.base};
  }
`;

const WrapperDropDown = styled.div`
  margin-top: ${dimensions.base};
  width: 21.5rem;
`;

const RestyledDropdown = styled(Dropdown)`
  margin-top: ${dimensions.xs_2};
  max-width: 21.5rem;
  width: 100%;
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

const StyledInputDeadline = styled.input`
  border: 0.5px solid #bdbdbd;
  border-radius: ${dimensions.xl_3};
  padding: 10px 0;
  width: 3.7rem;
  outline: none;
  padding-left: ${dimensions.xl};
  background: ${colors.bg_secondary};
  :hover {
    border: 0.5px solid ${colors.accent_color};
  }
  :focus {
    border: 0.5px solid ${colors.accent_color};
  }
  @media (max-width: ${dimensions.tablet_width}) {
    width: 100%;
  }
  @media (max-width: ${dimensions.phone_width}) {
    width: 70%;
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
  location: Location;
  newTitleAndAuthor: INewData;
  newDeadline: number;
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
  status,
  title,
  author,
  newTitleAndAuthor,
  newDeadline,
  handleChangeLocation,
  handleChangeNewGenre,
  handleChangeDeadline,
  handleChangeAuthorAndTitle,
}) => {
  const { userRole } = useAppSelector((state) => state.user);

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
    <WrapperInfo>
      <BookImage src={src || bookImage} />
      <ShortDescription>
        {editing ? (
          <>
            <TitleHolder>Name </TitleHolder>
            <WrapperInput>
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
        {!editing && <Topic>Genre: </Topic>}
        {userRole === RolesTypes.READER ? (
          <OpenLink>{category || 'Genres of book'}</OpenLink>
        ) : editing ? (
          <WrapperDropDown>
            <TitleHolder>Genre </TitleHolder>
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
            <TitleHolder>Author </TitleHolder>
            <WrapperInput>
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
            <Topic>Author: </Topic>
            <TopicDescription>{author || 'Author Name'}</TopicDescription>
          </>
        )}
        <>
          {editing ? (
            <WrapperDropDown>
              <TitleHolder>Location </TitleHolder>
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
              <Topic>Location: </Topic>
              <TopicDescription>{location.location}</TopicDescription>
            </>
          )}
        </>
        {userRole === RolesTypes.READER ? (
          <>
            <Topic>State: </Topic>
            <StyledStatus>
              <BookStatus status={status} date={date} />
            </StyledStatus>
          </>
        ) : editing ? (
          <>
            <br />
            <TitleHolder>Deadline </TitleHolder>
            <StyledInputDeadline
              value={newDeadline}
              type="number"
              onChange={handleChangeDeadline}
              min="1"
              max="31"
            />{' '}
            days
          </>
        ) : (
          <>
            <Topic>Deadline: </Topic>
            <TopicDescription>{newDeadline + ' days'}</TopicDescription>
          </>
        )}
      </ShortDescription>
    </WrapperInfo>
  );
};

export default DescriptionBook;
