import React, { FC, useState } from 'react';
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
  useGetAllLocationsQuery,
  useUpdatePersonLocationMutation,
} from '@mimir/apollo-client';
import { useGoogleLogin } from '@react-oauth/google';
import { ReactComponent as GoogleSvg } from '../../assets/google.svg';
import { ReactComponent as LogoSvg } from '../../assets/Mimir.svg';
import Button from '../components/Button';
import axios from 'axios';
import { TAuthResponseData } from '../types';

const StartPageBackground = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: #f9faff;
  background-image: url('../../assets/startpage-pattern.png');
`;

const StartPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 96%;
  background-color: ${colors.bg_secondary};
  border-radius: 1000px 1000px 0 0;
  box-shadow: 0px 10px 70px rgba(26, 30, 214, 0.08);
  padding: 0 175px;
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

const StartPage: FC = () => {
  const [preparedUserPayload, setPreparedUserPayload] =
    useState<IUserPayload>();
  const [isSignUp, setIsSignUp] = useState(false);
  const { data: GetAllLocationsData, loading: GetAllLocationsLoading } =
    useGetAllLocationsQuery();
  const [updatePersonLocationMutation] = useUpdatePersonLocationMutation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const history = useNavigate();
  console.log(process.env['NX_API_ROOT_URL']);
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async ({ code }) => {
      const { data } = await axios.post<TAuthResponseData>(
        `${process.env['NX_API_ROOT_URL']}/api/auth`,
        {
          code,
        }
      );
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('id_token', data.id_token);
      localStorage.setItem('expiry_date', data.expiry_date.toString());
      localStorage.setItem('refresh_token', data.refresh_token);

      const location = GetAllLocationsData?.getAllLocations.find((loc) => {
        if (!data.location_id) return null;
        return loc?.id === data.location_id.toString();
      });

      if (location) {
        const reworkedLocation = { id: location.id, value: location.location };
        dispatch(
          setUser({ ...data, location: reworkedLocation, isAuth: true })
        );
        return history('/home');
      }

      setPreparedUserPayload({ ...data, location: { id: '0', value: '' } });
      setIsSignUp(true);
    },
  });

  const handleChangeDropdown = async (location: TUserLocation) => {
    await updatePersonLocationMutation({
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
        {!isSignUp && (
          <Button
            value="Sign In With"
            svgComponent={<GoogleSvg />}
            invert
            transparent
            onClick={googleLogin}
          />
        )}
      </StartPageContainer>
    </StartPageBackground>
  );
};

export default StartPage;
