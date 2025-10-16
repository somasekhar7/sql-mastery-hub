import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import progressReducer from './slices/progressSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    progress: progressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;