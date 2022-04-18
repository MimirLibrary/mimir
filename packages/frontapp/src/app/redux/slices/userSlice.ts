import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  username: string;
}

const initialState: IUserState = {
  username: 'a',
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state: IUserState, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
