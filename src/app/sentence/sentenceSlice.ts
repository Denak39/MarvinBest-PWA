import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction, createSlice } from '@reduxjs/toolkit';

import type { Sentence } from '@mocks/type';
import { mockUsers } from '@mocks/user';

export const loadSentencesFromLocalStorage = createAction(
  'sentences/loadSentencesFromLocalStorage'
);
export const saveSentencesToLocalStorage = createAction<Sentence[]>(
  'sentences/saveSentencesToLocalStorage'
);
interface SentencesState {
  sentences: Sentence[];
}

const initialState: SentencesState = {
  sentences: [],
};

const sentencesSlice = createSlice({
  name: 'sentences',
  initialState,
  reducers: {
    addSentence: (
      state,
      action: PayloadAction<{ sentence: string; userId: number }>
    ) => {
      const { sentence, userId } = action.payload;

      const user = mockUsers.find((u) => u.id === userId);

      if (!user) {
        throw new Error(`User with ID ${userId} not found.`);
      }

      const newSentence: Sentence = {
        id: Date.now(),
        sentence,
        user,
      };
      return {
        ...state,
        sentences: [...state.sentences, newSentence],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSentencesFromLocalStorage, (state) => {
      const sentencesInStorage = JSON.parse(
        localStorage.getItem('sentences') || '[]'
      );
      // eslint-disable-next-line no-param-reassign
      state.sentences = sentencesInStorage;
    });
  },
});

export const { addSentence } = sentencesSlice.actions;
export default sentencesSlice.reducer;
