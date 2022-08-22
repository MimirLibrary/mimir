import styled from '@emotion/styled';
import {
  useGetAllLocationsQuery,
  useUpdatePersonLocationMutation,
} from '@mimir/apollo-client';
import { colors, dimensions } from '@mimir/ui-kit';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown, { IDropdownOption } from '../components/Dropdown';
import { TextArticle } from '../globalUI/TextArticle';
import { TextBase } from '../globalUI/TextBase';
import { useAppDispatch } from '../hooks/useTypedDispatch';
import { useAppSelector } from '../hooks/useTypedSelector';
import {
  addLocation,
  removeLocation,
  TUserLocation,
  updateUserLocation,
} from '../store/slices/userSlice';
import DropDownLocation from '../components/DropdownLocation';

export type TLanguage = {
  locale: string;
} & IDropdownOption;

const WrapperSettings = styled.div`
  @media (max-width: ${dimensions.tablet_width}) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Wrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: ${dimensions.xl_2};
`;

const SettingsContainer = styled.div`
  box-sizing: border-box;
  padding: ${dimensions.base_2};
  background-color: ${colors.bg_secondary};
  box-shadow: 0px 10px 70px rgba(26, 30, 214, 0.08);
  border-radius: ${dimensions.xs_1};
`;

const SettingsArticle = styled.h4`
  color: ${colors.main_black};
  line-height: ${dimensions.xl};
  font-weight: 600;
`;

const RestyledDropdown = styled(Dropdown)`
  margin: ${dimensions.base} 0 ${dimensions.xl_2};
  max-width: 310px;
`;

const StyledDropDownLocation = styled(DropDownLocation)`
  margin: ${dimensions.base} 0 ${dimensions.xl_2};
  max-width: 310px;
`;

const languages: TLanguage[] = [
  { locale: 'ru', value: 'RUS' },
  { locale: 'en', value: 'ENG' },
];

const SettingsPage = () => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const { data: GetAllLocationsData, loading: GetAllLocationsLoading } =
    useGetAllLocationsQuery();
  const [updatePersonLocationMutate] = useUpdatePersonLocationMutation();
  const { id, location } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const currentLocaleIndex = useMemo(
    () => languages.findIndex(({ locale }) => locale === language),
    [language]
  );

  const handleLocationChange = async (location: TUserLocation) => {
    dispatch(updateUserLocation(location));
    await updatePersonLocationMutate({
      variables: {
        location_id: parseInt(location.id),
        person_id: id,
      },
    });
  };

  const handleLanguageChange = ({ locale }: TLanguage) => {
    changeLanguage(locale);
    localStorage.setItem('locale', locale);
  };

  // const handleChangeLocation = useCallback((
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   option: IDropdownOption
  // ) => {
  //   let result = []
  //   if (e.target.checked) {
  //     result.push(option);
  //   }
  //   result = result.filter((loc) => loc.value === option.value);
  //   console.log(result);
  // }, [};

  const handleChangeLocation = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, option: TUserLocation) => {
      if (e.target.checked) {
        dispatch(addLocation(option));
      } else {
        dispatch(removeLocation(option.id));
      }
    },
    []
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    option: TUserLocation
  ) => {
    setIsCheck(e.target.checked);
    if (e.target.checked) {
    }
  };
  return (
    <WrapperSettings>
      <Wrapper>
        <TextArticle>{t('Settings.Title')}</TextArticle>
        <TextBase>{t('Settings.Desc')}</TextBase>
      </Wrapper>
      <SettingsContainer>
        <SettingsArticle>{t('Settings.Location')}</SettingsArticle>
        {/*{!GetAllLocationsLoading && !!GetAllLocationsData && (*/}
        {/*  <RestyledDropdown*/}
        {/*    options={GetAllLocationsData.getAllLocations.map((loc) => ({*/}
        {/*      id: loc!.id,*/}
        {/*      value: loc!.location,*/}
        {/*    }))}*/}
        {/*    initIndex={GetAllLocationsData.getAllLocations.findIndex((loc) => {*/}
        {/*      if (location) return loc!.id === location.id;*/}
        {/*      return 0;*/}
        {/*    })}*/}
        {/*    onChange={(option) => handleLocationChange(option as TUserLocation)}*/}
        {/*  />*/}
        {/*)}*/}
        {!GetAllLocationsLoading && !!GetAllLocationsData && (
          <StyledDropDownLocation
            options={GetAllLocationsData.getAllLocations.map((loc) => ({
              id: loc!.id,
              value: loc!.location,
            }))}
            handleChangeLocations={handleChangeLocation}
            placeholder="Please choose your locations"
          />
        )}

        <SettingsArticle>{t('Settings.Language')}</SettingsArticle>
        <RestyledDropdown
          options={[...languages]}
          initIndex={currentLocaleIndex}
          onChange={(option) => handleLanguageChange(option as TLanguage)}
        />
      </SettingsContainer>
    </WrapperSettings>
  );
};

export default SettingsPage;
