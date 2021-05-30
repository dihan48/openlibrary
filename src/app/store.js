import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import headerReducer from '../slices/searchSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    search: headerReducer,
  },
});
