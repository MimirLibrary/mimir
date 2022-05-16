import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import tabsReducer from '../slices/tabsSlice';
import sidebarReducer from '../slices/sidebarSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  tabs: tabsReducer,
  sidebar: sidebarReducer,
});
