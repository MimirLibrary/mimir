import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import tabsReducer from '../slices/tabsSlice';
import materialReducer from '../slices/materialsSlice';
import identifierReducer from '../slices/identifierSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  tabs: tabsReducer,
  materials: materialReducer,
  identifier: identifierReducer,
});
