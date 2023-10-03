import type { Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';

import { clearIndexedDB } from './indexedDB';

export interface Media {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
}

interface MediaState {
  media: Media[];
}

const initialState: MediaState = {
  media: [],
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    addMedia: (state, action: PayloadAction<Media>) => {
      state.media.push(action.payload);
    },
    clearMedia: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.media = [];
    },
  },
});

export const { addMedia, clearMedia } = mediaSlice.actions;

export const clearMediaFromDB = () => {
  return (dispatch: Dispatch) => {
    clearIndexedDB().then(() => {
      dispatch(clearMedia());
    });
  };
};

export const selectMediaData = (state: { media: MediaState }) => state.media.media;

export const selectMedia = createSelector(
  (state: { media: MediaState }) => state.media.media,
  (media) => media
);

export default mediaSlice.reducer;
