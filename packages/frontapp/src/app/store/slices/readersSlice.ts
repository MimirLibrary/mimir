import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReader, IReadersState } from '../../types';

const initialState: IReadersState = {
  searchReaders: [],
};

const readersSlice = createSlice({
  name: 'readerSlice',
  initialState,
  reducers: {
    setSearchReaders: (
      state: IReadersState,
      { payload }: PayloadAction<(IReader | null)[] | null | undefined>
    ) => {
      state.searchReaders = payload;
    },
  },
});

export const { setSearchReaders } = readersSlice.actions;
export default readersSlice.reducer;
