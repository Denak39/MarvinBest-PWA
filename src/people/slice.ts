import { api } from '@app/api';
import type { People } from '@people/types';

export const peopleSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPeople: builder.query<People[], void>({
      query: () => '/people',
      providesTags: ['People'],
    }),
  }),
});

export const { useGetPeopleQuery } = peopleSlice;
