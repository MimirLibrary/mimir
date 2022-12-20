import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { useAppDispatch } from '../hooks/useTypedDispatch';
import {
  IUserPayload,
  setUser,
  TUserLocation,
} from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { colors, dimensions, fonts } from '@mimir/ui-kit';
import Dropdown from '../components/Dropdown';
import {
  useAddPersonLocationMutation,
  useGetAllLocationsQuery,
} from '@mimir/apollo-client';
import { ReactComponent as LogoSvg } from '../../assets/Mimir.svg';
import Button from '../components/Button';
import { toast } from 'react-toastify';
import { createUser } from '../axios-api/api';
import {
  getAppUserManager,
  getOidcState,
  setAuthTokens,
} from '@mimir/auth-manager';

const StartPageBackground = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: ${colors.light_gray};
  background-image: url('../../assets/bookshelf-pattern.png');
  @media (max-width: ${dimensions.phone_width}) {
    overflow: hidden;
    align-items: flex-end;
  }
`;

const StartPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 96%;
  background-color: ${colors.bg_secondary};
  border-radius: 1000px 1000px 0 0;
  box-shadow: ${colors.shadow};
  padding: 0 175px;
  @media (max-width: ${dimensions.phone_width}) {
    font-size: ${dimensions.sm};
    padding: 0 ${dimensions.base_2};
    margin: 0;
    height: 90%;
  }
`;

const Logo = styled(LogoSvg)`
  width: 12.5rem;
  height: 17.2rem;
`;

const WelcomeHeader = styled.h1`
  font-family: ${fonts.secondary};
  font-weight: 600;
  font-size: ${dimensions.base_2};
  line-height: 2.6rem;
  color: ${colors.main_black};
  margin-top: ${dimensions.xs};
  margin-bottom: ${dimensions.base};
  text-align: center;
  max-width: 380px;
`;

const StartPageParagraph = styled.p`
  margin-top: 0;
  margin-bottom: ${dimensions.xl_3};
  font-weight: 300;
  font-size: ${dimensions.xl};
  line-height: ${dimensions.xl_2};
  color: ${colors.main_black};
  text-align: center;

  @media (max-width: ${dimensions.phone_width}) {
    font-size: ${dimensions.lg};
  }
`;

const RestyledDropdown = styled(Dropdown)`
  border: 2px solid ${colors.accent_color};
  max-width: 350px;
  width: 100%;
  height: ${dimensions.xl_10};
  margin-bottom: ${dimensions.xs_2};
`;

const userManager = getAppUserManager();

const signIn = (): Promise<void> => {
  return userManager.signinRedirect({ state: getOidcState() });
};

interface StartPageProps {
  ssoRedirect?: boolean;
}

const StartPage: FC<StartPageProps> = ({ ssoRedirect }) => {
  const [preparedUserPayload, setPreparedUserPayload] =
    useState<IUserPayload>();
  const [isSignUp, setIsSignUp] = useState(false);
  const {
    data: GetAllLocationsData,
    loading: GetAllLocationsLoading,
    error: GetAllLocationsError,
  } = useGetAllLocationsQuery();
  const [addPersonLocation] = useAddPersonLocationMutation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const history = useNavigate();

  useEffect(() => {
    if (!ssoRedirect) {
      return;
    }
    const handleSsoRedirect = async () => {
      try {
        const oidcUserInfo = await userManager.signinRedirectCallback();
        setAuthTokens(oidcUserInfo);

        const { data } = await createUser();

        if (data.location?.length && Array.isArray(data.location)) {
          const transformLocations = data.location.map((loc: any) => ({
            id: String(loc.id),
            value: loc.location,
          }));
          dispatch(
            setUser({ ...data, location: transformLocations, isAuth: true })
          );
          return history('/home');
        }

        setPreparedUserPayload({ ...data, location: { id: '0', value: '' } });
        setIsSignUp(true);
      } finally {
        await userManager.clearStaleState();
      }
    };
    handleSsoRedirect();
  }, []);

  const handleChangeDropdown = async (location: TUserLocation) => {
    await addPersonLocation({
      variables: {
        location_id: parseInt(location.id),
        person_id: preparedUserPayload!.id,
      },
    });
    dispatch(
      setUser({
        ...preparedUserPayload,
        isAuth: true,
        location,
      } as IUserPayload)
    );
    history('/home');
  };

  useEffect(() => {
    if (GetAllLocationsError) {
      toast.error(GetAllLocationsError.message);
    }
  }, [GetAllLocationsError]);

  return (
    <StartPageBackground>
      <StartPageContainer>
        <Logo />
        <WelcomeHeader>Welcome to the library MIMIR</WelcomeHeader>
        <StartPageParagraph>Simplify the process of claim</StartPageParagraph>
        {!GetAllLocationsLoading && !!GetAllLocationsData && isSignUp && (
          <RestyledDropdown
            placeholder={t('Start.ChooseLocation')}
            options={GetAllLocationsData.getAllLocations.map((loc) => ({
              id: loc!.id,
              value: loc!.location,
            }))}
            onChange={(option) => handleChangeDropdown(option as TUserLocation)}
          />
        )}
        {!isSignUp && !ssoRedirect && (
          <Button value="Sign In With" invert transparent onClick={signIn} />
        )}
      </StartPageContainer>
    </StartPageBackground>
  );
};

export default StartPage;
