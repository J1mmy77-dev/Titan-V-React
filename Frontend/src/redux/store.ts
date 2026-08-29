import { configureStore } from '@reduxjs/toolkit';
import climaReducer from './climaSlice';

export const store = configureStore({
  reducer: {
    clima: climaReducer,
  },
});

// Tipos útiles para el resto del proyecto (Redux Toolkit + TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
