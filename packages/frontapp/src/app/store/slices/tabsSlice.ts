import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IStateTabs {
  activeTab: null | number;
}

const initialState: IStateTabs = {
  activeTab: 0,
};

const tabsSlice = createSlice({
  name: 'tabsSlice',
  initialState,
  reducers: {
    setActiveTab: (state: IStateTabs, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = tabsSlice.actions;
export default tabsSlice.reducer;
