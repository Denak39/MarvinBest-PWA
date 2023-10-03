/* eslint-disable import/prefer-default-export */

import { configureStore } from '@reduxjs/toolkit';

import { api } from '@api/index';
import syncMiddleware from '@app/middleware';
import mediaReducer from '@people/imageSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    media: mediaReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, syncMiddleware),
});
