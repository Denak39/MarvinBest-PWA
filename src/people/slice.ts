import type { ApiPeopleResponse } from '@api/types';
import { api } from '@app/api';
import { parsePeopleResponse } from '@people/parsers';
import type { People } from '@people/types';

export const peopleSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPeople: builder.query<People, void>({
      query: () => '/people',
      providesTags: ['People'],
      transformResponse: (data: ApiPeopleResponse): People => parsePeopleResponse(data),
    }),
  }),
});

export const { useGetPeopleQuery } = peopleSlice;
