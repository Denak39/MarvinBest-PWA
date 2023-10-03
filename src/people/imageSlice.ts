import type { Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';

import { clearIndexedDB } from './indexedDB';

export interface Image {
  id: string;
  name: string;
  url: string;
  // data: ArrayBuffer;
}

interface ImagesState {
  images: Image[];
}

const initialState: ImagesState = {
  images: [],
};

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<Image>) => {
      state.images.push(action.payload);
    },
    clearImages: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.images = [];
    },
  },
});

export const { addImage, clearImages } = imagesSlice.actions;

export const clearImagesFromDB = () => {
  return (dispatch: Dispatch) => {
    clearIndexedDB().then(() => {
      dispatch(clearImages());
    });
  };
};

export const selectImagesData = (state: { images: ImagesState }) => state.images.images;
// export const selectImages = (state: { images: ImagesState }) =>
//   state.images.images.map((image) => ({
//     id: image.id,
//     name: image.name,
//     url: image.url,
//   }));
export const selectImages = createSelector(
  (state: { images: ImagesState }) => state.images.images,
  (images) => images
);
export default imagesSlice.reducer;
