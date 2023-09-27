import { convertToQueryArg } from '@api/helpers';
import { api } from '@api/index';
import type {
  ApiPeopleOptionsResponse,
  ApiPeopleResponse,
  ApiPersonResponse,
  ApiQueryArg,
  CollectionResponse,
} from '@api/types';
import {
  parsePeopleOptionsResponse,
  parsePeopleResponse,
  parsePersonResponse,
} from '@people/parsers';
import type { People, PeopleOptions, Person } from '@people/types';

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
    getPerson: builder.query<Person, Person['id']>({
      query: (id) => `/people/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'People', id }],
      transformResponse: (data: ApiPersonResponse) => parsePersonResponse(data),
    }),
    getPeopleOptions: builder.query<PeopleOptions, ApiQueryArg<PeopleOptions> | void>({
      query: (args) => `/people/light${convertToQueryArg(args)}`,
      providesTags: ['PeopleOptions'],
      transformResponse: (data: ApiPeopleOptionsResponse) => parsePeopleOptionsResponse(data),
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonQuery, useGetPeopleOptionsQuery } = peopleSlice;
