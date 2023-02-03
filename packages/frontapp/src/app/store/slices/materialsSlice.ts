import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMaterial, IMaterialsState } from '../../types';

const initialState: IMaterialsState = {
  searchMaterials: [],
};

const materialSlice = createSlice({
  name: 'materialSlice',
  initialState,
  reducers: {
    setSearchMaterials: (
      state: IMaterialsState,
      {
        payload,
      }: PayloadAction<(Partial<IMaterial> | null)[] | null | undefined>
    ) => {
      state.searchMaterials = payload;
    },
  },
});

export const { setSearchMaterials } = materialSlice.actions;
export default materialSlice.reducer;
