import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMaterialState, IStateMaterials } from '../../types';

const initialState: IStateMaterials = {
  searchMaterials: [],
};

const materialSlice = createSlice({
  name: 'materialSlice',
  initialState,
  reducers: {
    setSearchMaterials: (
      state: IStateMaterials,
      { payload }: PayloadAction<(IMaterialState | null)[] | null | undefined>
    ) => {
      state.searchMaterials = payload;
    },
  },
});

export const { setSearchMaterials } = materialSlice.actions;
export default materialSlice.reducer;
