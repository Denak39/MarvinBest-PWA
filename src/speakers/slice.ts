import { api } from '@app/api';
import type { Speaker } from '@speakers/types';

export const speakersSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getSpeakers: builder.query<Speaker[], void>({
      query: () => '/speakers',
      providesTags: ['Speakers'],
    }),
  }),
});

export const { useGetSpeakersQuery } = speakersSlice;
