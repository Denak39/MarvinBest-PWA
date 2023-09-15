import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Sentence } from "../../mock/type";
import { mockUsers } from "../../mock/user";
interface SentencesState {
  sentences: Sentence[];
}

const initialState: SentencesState = {
  sentences: [],
};

const sentencesSlice = createSlice({
  name: "sentences",
  initialState,
  reducers: {
    addSentence: (
      state,
      action: PayloadAction<{ sentence: string; userId: number }>,
    ) => {
      const { sentence, userId } = action.payload;
      const user = mockUsers.find((user) => user.id === userId);

      if (!user) {
        throw new Error(`User with ID ${userId} not found.`);
      }

      const newSentence: Sentence = {
        id: Date.now(),
        sentence,
        user,
      };

      state.sentences.push(newSentence);
    },
  },
});

export const { addSentence } = sentencesSlice.actions;
export default sentencesSlice.reducer;
