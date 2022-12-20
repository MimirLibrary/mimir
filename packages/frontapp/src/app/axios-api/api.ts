import axios, { AxiosResponse } from 'axios';
import { IUserPayload } from '../store/slices/userSlice';

export const api = axios.create({
  baseURL: `${process.env['NX_API_ROOT_URL']}/api`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    'id-token': localStorage.getItem('id_token') as string | number | boolean,
  },
});

export const createUser = (): Promise<AxiosResponse<IUserPayload>> => {
  return axios.post(
    `${process.env['NX_API_ROOT_URL']}/api/auth/create-user`,
    null,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'id-token': localStorage.getItem('id_token') as string,
      },
    }
  );
};
