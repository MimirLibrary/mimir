import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import tabsReducer from '../slices/tabsSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  tabs: tabsReducer,
});
