import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavbarItems } from '../../../utils/NavbarItems';

interface IStateTabs {
  activeTab: string | null;
}

const initialState: IStateTabs = {
  activeTab: NavbarItems.HOME,
};

const tabsSlice = createSlice({
  name: 'tabsSlice',
  initialState,
  reducers: {
    setActiveTab: (state: IStateTabs, action: PayloadAction<string | null>) => {
      state.activeTab = action.payload;
    },
    resetTab: (state: IStateTabs) => {
      state.activeTab = NavbarItems.HOME;
    },
  },
});

export const { setActiveTab, resetTab } = tabsSlice.actions;
export default tabsSlice.reducer;
