import styled from '@emotion/styled';
import { useGetAllLocationsQuery } from '@mimir/apollo-client';
import { colors, dimensions } from '@mimir/ui-kit';
import { useTranslation } from 'react-i18next';
import Dropdown from '../components/Dropdown';
import { TitleArticle } from '../globalUI/TextArticle';
import { TextBase } from '../globalUI/TextBase';
import { useAppDispatch } from '../hooks/useTypedDispatch';
import { useAppSelector } from '../hooks/useTypedSelector';
import { TUserLocation, updateUserLocation } from '../store/slices/userSlice';

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

const SettingsPage = () => {
  const { t } = useTranslation();
  const { data: GetAllLocationsData, loading: GetAllLocationsLoading } =
    useGetAllLocationsQuery();
  const { location } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const languages = [{ value: 'RUS' }, { value: 'ENG' }];

  return (
    <WrapperSettings>
      <Wrapper>
        <TitleArticle>Settings</TitleArticle>
        <TextBase>
          Make applications as comfortable as possible for yourself! All changes
          are saved automatically
        </TextBase>
      </Wrapper>
      <SettingsContainer>
        <SettingsArticle>{t('Settings.Location')}</SettingsArticle>
        {!GetAllLocationsLoading && !!GetAllLocationsData && (
          <RestyledDropdown
            options={GetAllLocationsData.getAllLocations.map((loc) => ({
              id: loc!.id,
              value: loc!.location,
            }))}
            initIndex={GetAllLocationsData.getAllLocations.findIndex((loc) => {
              if (location) return loc!.id === location.id;
              return 0;
            })}
            onChange={(option) =>
              dispatch(updateUserLocation(option as TUserLocation))
            }
          />
        )}
        <SettingsArticle>{t('Settings.Language')}</SettingsArticle>
        <RestyledDropdown options={[...languages]} initIndex={1} />
      </SettingsContainer>
    </WrapperSettings>
  );
};

export default SettingsPage;
