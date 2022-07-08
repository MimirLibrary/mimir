import { setContext } from '@apollo/client/link/context';
import axios from 'axios';

export const refreshTokenLink = setContext(async () => {
  const expiry_date = localStorage.getItem('expiry_date');
  const refresh_token = localStorage.getItem('refresh_token');

  if (!expiry_date || !refresh_token) return {};

  const currentGMTTimestamp =
    Date.now() - Math.abs(new Date(Date.now()).getTimezoneOffset()) * 60000;

  if (currentGMTTimestamp > parseInt(expiry_date)) {
    const { data } = await axios.post<{
      access_token: string;
      id_token: string;
      expiry_date: string;
    }>('http://localhost:3333/api/auth/refresh-token', {
      refresh_token,
    });

    console.log(data);

    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('id_token', data.id_token);
    localStorage.setItem('expiry_date', data.expiry_date);
  }
  return {};
});
