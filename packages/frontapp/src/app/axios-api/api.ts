import axios from 'axios';

export const api = axios.create({
  baseURL: `${process.env['NX_API_ROOT_URL']}/api`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    'id-token': localStorage.getItem('id_token') as string | number | boolean,
  },
});
