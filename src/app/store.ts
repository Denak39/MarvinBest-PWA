/* eslint-disable import/prefer-default-export */

import { configureStore } from '@reduxjs/toolkit';

import { api } from '@api/index';
import syncMiddleware from '@app/middleware';
import sentencesReducer from '@app/sentence/sentenceSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    sentences: sentencesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, syncMiddleware),
});
