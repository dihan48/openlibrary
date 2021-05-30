import { configureStore } from '@reduxjs/toolkit';
import headerReducer from '../slices/searchSlice';

export const store = configureStore({
  reducer: {
    search: headerReducer,
  },
});
