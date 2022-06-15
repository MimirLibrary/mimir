import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  id: number;
  username: string;
  userRole: string;
}

const initialState: IUserState = {
  id: 5,
  username: '',
  userRole: 'manager',
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state: IUserState, action: PayloadAction<string>) => {
      state.username = action.payload;
      state.userRole = 'manager';
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
