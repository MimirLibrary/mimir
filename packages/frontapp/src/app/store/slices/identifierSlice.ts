import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IStateIdentifier {
  identifier: string;
}

const initialState = {
  identifier: '',
} as IStateIdentifier;

export const identifierSlice = createSlice({
  name: 'identifierSlice',
  initialState,
  reducers: {
    setIdentifier: (
      state: IStateIdentifier,
      { payload }: PayloadAction<string>
    ) => {
      state.identifier = payload;
    },
    removeIdentifier: (state: IStateIdentifier) => {
      state.identifier = '';
    },
  },
});

export const { setIdentifier, removeIdentifier } = identifierSlice.actions;

export default identifierSlice.reducer;
