import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IStateSidebar {
  isSidebarVisible: boolean;
}

const initialState: IStateSidebar = {
  isSidebarVisible: false,
};

const sidebarSlice = createSlice({
  name: 'sidebarSlice',
  initialState,
  reducers: {
    setSidebarStatus: (
      state: IStateSidebar,
      action: PayloadAction<boolean>
    ) => {
      state.isSidebarVisible = action.payload;
    },
  },
});

export const { setSidebarStatus } = sidebarSlice.actions;
export default sidebarSlice.reducer;
