import { IUserPayload } from '../store/slices/userSlice';

export type TAuthResponseData = Omit<IUserPayload, 'locations'> & {
  location_id: number;
  location: string;
};
