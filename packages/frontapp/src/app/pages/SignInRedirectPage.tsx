import { StartPageTemplate } from './StartPageTemplate';
import {
  IUserPayload,
  setUser,
  TUserLocation,
} from '../store/slices/userSlice';
import React, { useEffect, useState } from 'react';
import {
  useAddPersonLocationMutation,
  useGetAllLocationsQuery,
} from '@mimir/apollo-client';
import styled from '@emotion/styled';
import Dropdown from '../components/Dropdown';
import { colors, dimensions } from '@mimir/ui-kit';
import { useAppDispatch } from '../hooks/useTypedDispatch';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../axios-api/api';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { AuthManager } from '@mimir/auth-manager';

const RestyledDropdown = styled(Dropdown)`
  border: 2px solid ${colors.accent_color};
  max-width: 350px;
  width: 100%;
  height: ${dimensions.xl_10};
  margin-bottom: ${dimensions.xs_2};
`;

export const SignInRedirectPage = () => {
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
    const handleSsoRedirect = async () => {
      await AuthManager.instance.signInRedirectCallback();

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
    <StartPageTemplate>
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
    </StartPageTemplate>
  );
};
