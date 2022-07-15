import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RolesTypes } from '@mimir/global-types';

export type TUserLocation = {
  id: string;
  value: string;
};

interface IUserState {
  id: number;
  username: string;
  avatar: string;
  email: string;
  userRole: RolesTypes;
  location: TUserLocation;
  isAuth: boolean;
  blocked: boolean;
}

export interface IUserPayload extends IUserState {
  access_token: string;
  id_token: string;
  refresh_token: string;
  expiry_date: number;
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
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state: IUserState, action: PayloadAction<IUserPayload>) => {
      const { username, avatar, email, location, id, userRole, blocked } =
        action.payload;

      state.location = location;
      state.username = username;
      state.avatar = avatar;
      state.email = email;
      state.id = id;
      state.isAuth = true;
      state.location = location;
      state.userRole = userRole;
      state.blocked = blocked ? blocked : false;
    },
    updateUserLocation: (
      state: IUserState,
      action: PayloadAction<TUserLocation>
    ) => {
      state.location = action.payload;
    },
    logout: (state: IUserState) => {
      state.isAuth = false;
    },
  },
});

export const { setUser, updateUserLocation, logout } = userSlice.actions;

export default userSlice.reducer;
