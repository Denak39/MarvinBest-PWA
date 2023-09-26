import { api } from '@api/index';
import type { ApiSentenceResponse } from '@api/types';
import { parseSentenceResponse } from '@sentences/parsers';
import type { AddSentence, Sentence } from '@sentences/types';

export const sentencesSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addSentence: builder.mutation<Sentence, AddSentence>({
      query: (body) => ({
        url: `/best_ofs`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }),
      invalidatesTags: ['People'],
      transformResponse: (data: ApiSentenceResponse) => parseSentenceResponse(data),
    }),
  }),
});

export const { useAddSentenceMutation } = sentencesSlice;
