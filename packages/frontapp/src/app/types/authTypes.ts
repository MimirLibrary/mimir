import { IUserPayload } from '../store/slices/userSlice';

export type TAuthResponseData = Omit<IUserPayload, 'location'> & {
  location_id: number;
};
