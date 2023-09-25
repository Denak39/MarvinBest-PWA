import { api } from '@api/index';
import type { ISentencesForm } from '@app/types';

export const sentenceSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    postSentence: builder.mutation<ISentencesForm, ISentencesForm>({
      query: (body) => {
        return {
          url: '/best_ofs',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        };
      },
      invalidatesTags: ['Sentence'],
    }),
  }),
});

export const { usePostSentenceMutation } = sentenceSlice;
