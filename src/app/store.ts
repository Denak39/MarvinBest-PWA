import { configureStore } from '@reduxjs/toolkit';

import { api } from '@app/api';
import sentencesReducer from '@app/sentence/sentenceSlice';

import syncMiddleware from './middleware';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    sentences: sentencesReducer,
  },
  middleware: [syncMiddleware],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
