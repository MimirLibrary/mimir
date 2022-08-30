import { setContext } from '@apollo/client/link/context';
import axios from 'axios';

export const refreshTokenLink = setContext(async () => {
  const expiry_date = localStorage.getItem('expiry_date');
  const refresh_token = localStorage.getItem('refresh_token');

  if (!expiry_date || !refresh_token) return {};

  if (Date.now() > parseInt(expiry_date)) {
    const { data } = await axios.post<{
      access_token: string;
      id_token: string;
      expiry_date: string;
    }>(`${process.env['NX_API_ROOT_URL']}/api/auth/refresh-token`, {
      refresh_token,
    });

    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('id_token', data.id_token);
    localStorage.setItem('expiry_date', data.expiry_date);
  }
  return {};
});
