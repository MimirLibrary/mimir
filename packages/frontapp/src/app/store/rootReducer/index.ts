import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import tabsReducer from '../slices/tabsSlice';
import materialReducer from '../slices/materialsSlice';
import identifierReducer from '../slices/identifierSlice';
import readerReducer from '../slices/readersSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  tabs: tabsReducer,
  materials: materialReducer,
  identifier: identifierReducer,
  readers: readerReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
