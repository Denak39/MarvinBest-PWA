import { formatQueryArg } from '@api/helpers';
import { api } from '@api/index';
import type { ApiPeopleResponse, ApiQueryArg, CollectionResponse } from '@api/types';
import { parsePeopleResponse } from '@people/parsers';
import type { People } from '@people/types';

export const peopleSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPeople: builder.query<CollectionResponse<People>, ApiQueryArg<People> | void>({
      query: (args) => `/people${formatQueryArg(args)}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'People' as const, id })),
              { type: 'People', id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'People', id: 'PARTIAL-LIST' }],
      transformResponse: (data: ApiPeopleResponse) => parsePeopleResponse(data),
    }),
  }),
});

export const { useGetPeopleQuery } = peopleSlice;
