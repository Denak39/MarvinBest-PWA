import { convertToQueryArg } from '@api/helpers';
import { api } from '@api/index';
import type {
  ApiPeopleResponse,
  ApiPersonResponse,
  ApiQueryArg,
  CollectionResponse,
} from '@api/types';
import type { BaseEntity } from '@app/types';
import { parsePeopleResponse, parsePersonResponse } from '@people/parsers';
import type { People, Person } from '@people/types';

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
    getPerson: builder.query<Person, BaseEntity['id']>({
      query: (id) => `/people/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'People', id }],
      transformResponse: (data: ApiPersonResponse) => parsePersonResponse(data),
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonQuery } = peopleSlice;
