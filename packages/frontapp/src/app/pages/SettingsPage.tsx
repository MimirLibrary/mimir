import styled from '@emotion/styled';
import {
  useAddPersonLocationMutation,
  useGetAllLocationsQuery,
  useRemovePersonLocationMutation,
} from '@mimir/apollo-client';
import { colors, dimensions } from '@mimir/ui-kit';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TextArticle } from '../globalUI/TextArticle';
import { TextBase } from '../globalUI/TextBase';
import { useAppDispatch } from '../hooks/useTypedDispatch';
import { useAppSelector } from '../hooks/useTypedSelector';
import {
  addLocation,
  removeLocation,
  TUserLocation,
} from '../store/slices/userSlice';
import { toast } from 'react-toastify';
import LocationsContainer from '../components/LocationsContainer';
import { RadioGroup } from '../components/RadioButton';
import Loader from '../components/Loader';

const PageWrapper = styled.div`
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
  padding: ${dimensions.base};
  background-color: ${colors.bg_secondary};
  box-shadow: 0px 10px 70px rgba(26, 30, 214, 0.08);
  border-radius: ${dimensions.xs_1};
`;

const SettingsArticle = styled.h4`
  color: ${colors.main_black};
  line-height: ${dimensions.xl};
  font-weight: 600;
  margin-bottom: ${dimensions.xs_2};
  span {
    font-weight: 400;
    font-size: ${dimensions.base};
    line-height: ${dimensions.xl};
    color: ${colors.main_black};
  }
`;

const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${dimensions.base};
`;

const languages = [
  { locale: 'en', value: 'ENG' },
  { locale: 'ru', value: 'RUS' },
];

const SettingsPage = () => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const {
    data: GetAllLocationsData,
    loading: GetAllLocationsLoading,
    error: GetAllLocationsError,
  } = useGetAllLocationsQuery();
  const [addPersonLocation] = useAddPersonLocationMutation();
  const [removePersonLocation] = useRemovePersonLocationMutation();
  const { id } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLanguageChange = (value: string) => {
    changeLanguage(value);
    localStorage.setItem('locale', value);
  };

  const handleChangeLocation = async (
    e: React.ChangeEvent<HTMLInputElement>,
    option: TUserLocation
  ) => {
    if (e.target.checked) {
      await addPersonLocation({
        variables: {
          location_id: +option.id,
          person_id: id,
        },
      });
      dispatch(addLocation(option));
    } else {
      await removePersonLocation({
        variables: {
          location_id: +option.id,
          person_id: id,
        },
      });
      dispatch(removeLocation(option.id));
    }
  };

  useEffect(() => {
    if (GetAllLocationsError) {
      toast.error(GetAllLocationsError.message);
    }
  }, [GetAllLocationsError]);

  return (
    <PageWrapper>
      <Wrapper>
        <TextArticle>{t('Settings.Title')}</TextArticle>
        <TextBase>{t('Settings.Desc')}</TextBase>
      </Wrapper>
      <SettingsWrapper>
        <SettingsContainer>
          <SettingsArticle>{t('Settings.Language')}</SettingsArticle>
          <RadioGroup
            name="language"
            defaultValue={language}
            options={languages.map((lang) => ({
              name: lang.value,
              value: lang.locale,
            }))}
            onChange={handleLanguageChange}
          />
        </SettingsContainer>
        <SettingsContainer>
          <SettingsArticle>
            {t('Settings.Locations')} <span>({t('Settings.Several')})</span>
          </SettingsArticle>
          {!GetAllLocationsLoading && !!GetAllLocationsData ? (
            <LocationsContainer
              locations={GetAllLocationsData.getAllLocations.map((loc) => ({
                id: loc!.id,
                value: loc!.location,
              }))}
              onChange={handleChangeLocation}
            ></LocationsContainer>
          ) : (
            <Loader width={50} height={50} color={`${colors.accent_color}`} />
          )}
        </SettingsContainer>
      </SettingsWrapper>
    </PageWrapper>
  );
};

export default SettingsPage;
