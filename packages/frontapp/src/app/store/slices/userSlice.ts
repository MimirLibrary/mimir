import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RolesTypes } from '@mimir/global-types';
import { IDropdownOption } from '../../components/Dropdown';
import { RootState } from '../index';

export type TUserLocation = {
  id: string;
} & IDropdownOption;

interface IUserState {
  id: number;
  username: string;
  avatar: string;
  email: string;
  userRole: RolesTypes;
  location: TUserLocation;
  isAuth: boolean;
  blocked: boolean;
  locations: Array<TUserLocation>;
}

export interface IUserPayload extends IUserState {
  access_token: string;
  id_token: string;
  refresh_token: string;
  expiry_date: number;
  // location: TUserLocation;
}

const initialState: IUserState = {
  id: 5,
  isAuth: false,
  username: 'Test UserName',
  avatar: '',
  email: 'example@email.com',
  userRole: RolesTypes.READER,
  location: {
    id: '2',
    value: 'Gomel',
  },
  blocked: false,
  locations: [],
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state: IUserState, action: PayloadAction<IUserPayload>) => {
      const { username, avatar, email, location, id, userRole, blocked } =
        action.payload;
      state.locations.push(location);
      state.username = username;
      state.avatar = avatar;
      state.email = email;
      state.id = id;
      state.isAuth = true;
      state.userRole = userRole;
      state.blocked = blocked ? blocked : false;
      state.location = location;
    },
    updateBlocked: (state: IUserState, action: PayloadAction<boolean>) => {
      state.blocked = action.payload ? action.payload : false;
    },
    updateUserLocation: (
      state: IUserState,
      action: PayloadAction<TUserLocation>
    ) => {
      // state.location = action.payload;
      state.locations.push(action.payload);
    },
    logout: (state: IUserState) => {
      state.isAuth = false;
    },
    addLocation: (state: IUserState, action: PayloadAction<TUserLocation>) => {
      state.locations.push(action.payload);
    },
    removeLocation: (state: IUserState, action: PayloadAction<string>) => {
      state.locations = state.locations.filter(
        (loc) => loc.id !== action.payload
      );
    },
  },
});

export const {
  setUser,
  updateUserLocation,
  logout,
  updateBlocked,
  addLocation,
  removeLocation,
} = userSlice.actions;

const selectLocations = (state: RootState) => state.user.locations;

export const locationIds = createSelector(selectLocations, (locations) => {
  return locations.map((loc) => +loc.id);
});

export default userSlice.reducer;
