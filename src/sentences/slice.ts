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
        body: JSON.stringify({
          sentence: body.sentence.trim(),
          speaker: `/api/people/${body.personId}`,
        }),
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'People', id: arg.personId },
        'LastSentence',
      ],
      transformResponse: (data: ApiSentenceResponse) => parseSentenceResponse(data),
    }),
    getLastSentence: builder.query<Sentence, void>({
      query: () => `/last_best_of`,
      providesTags: ['LastSentence'],
      transformResponse: (data: ApiSentenceResponse) => parseSentenceResponse(data),
    }),
  }),
});

export const { useAddSentenceMutation, useGetLastSentenceQuery } = sentencesSlice;
