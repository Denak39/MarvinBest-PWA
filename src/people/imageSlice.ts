// imageSlice.ts
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@app/types';

interface Image {
  id: string;
  name: string;
  url: string;
}

interface ImageState {
  images: Image[];
}

const initialState: ImageState = {
  images: [],
};

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<Image>) => {
      state.images.push(action.payload);
      console.log('state', action);
    },
  },
});

export const { addImage } = imageSlice.actions;
export const selectImages = (state: RootState) => state.images.images;

export default imageSlice.reducer;
