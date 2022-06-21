import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TUserLocation = {
  id: string;
  value: string;
};

interface IUserState {
  id: number;
  username: string;
  userRole: string;
  location: TUserLocation;
}

interface IUserPayload {
  username: string;
  location: TUserLocation;
}

const initialState: IUserState = {
  id: 5,
  username: '',
  userRole: 'reader',
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
      state.username = action.payload.username;
      state.location = action.payload.location;
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
