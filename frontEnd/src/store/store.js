import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth/authSlice.js';
import { uiSlice } from './ui/uiSlice.js';


export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
  },
});
