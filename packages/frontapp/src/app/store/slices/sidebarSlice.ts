import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IStateSidebar {
  sidebarActive: boolean;
}

const initialState: IStateSidebar = {
  sidebarActive: false,
};

const sidebarSlice = createSlice({
  name: 'sidebarSlice',
  initialState,
  reducers: {
    setSidebarStatus: (
      state: IStateSidebar,
      action: PayloadAction<boolean>
    ) => {
      state.sidebarActive = action.payload;
    },
  },
});

export const { setSidebarStatus } = sidebarSlice.actions;
export default sidebarSlice.reducer;
