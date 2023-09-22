import { convertToQueryArg } from '@api/helpers';
import { api } from '@api/index';
import type { ApiPeopleResponse, ApiQueryArg, CollectionResponse } from '@api/types';
import { parsePeopleResponse } from '@people/parsers';
import type { People } from '@people/types';

export const peopleSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPeople: builder.query<CollectionResponse<People>, ApiQueryArg<People> | void>({
      query: (args) => `/people${convertToQueryArg(args)}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'People' as const, id })),
              { type: 'People', id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'People', id: 'PARTIAL-LIST' }],
      transformResponse: (data: ApiPeopleResponse) => parsePeopleResponse(data),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCacheData, responseData) => {
        currentCacheData.data.push(...responseData.data);
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        if (!currentArg?.page || !previousArg?.page) return false;
        return currentArg.page > previousArg.page;
      },
    }),
  }),
});

export const { useGetPeopleQuery } = peopleSlice;
