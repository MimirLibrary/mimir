import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TUserLocation = {
  id: string;
  value: string;
};

interface IUserState {
  id: number;
  username: string;
  access_token: string;
  id_token: string;
  expiry_date: number;
  userRole: string;
  location: TUserLocation;
  isAuth: boolean;
}

export interface IUserPayload extends IUserState {
  refresh_token: string;
}

const initialState: IUserState = {
  id: 5,
  isAuth: false,
  username: 'Test UserName',
  access_token: '',
  id_token: '',
  expiry_date: Date.now(),
  userRole: 'Reader',
  location: {
    id: '2',
    value: 'Gomel',
  },
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state: IUserState, action: PayloadAction<IUserPayload>) => {
      const {
        username,
        location,
        access_token,
        expiry_date,
        id_token,
        id,
        refresh_token,
        userRole,
      } = action.payload;

      localStorage.setItem('refresh_token', refresh_token);
      state.location = location;
      state.access_token = access_token;
      state.expiry_date = expiry_date;
      state.id = id;
      state.id_token = id_token;
      state.isAuth = true;
      state.location = location;
      state.userRole = userRole;
    },
    updateUserLocation: (
      state: IUserState,
      action: PayloadAction<TUserLocation>
    ) => {
      state.location = action.payload;
    },
  },
});

export const { setUser, updateUserLocation } = userSlice.actions;

export default userSlice.reducer;
