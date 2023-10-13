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
      query: (arg) => `/people${convertToQueryArg<People>({ 'order[name]': 'asc', ...arg })}`,
      providesTags: (result) =>
        result?.data.map(({ id }) => ({ type: 'People' as const, id })) ?? [],
      transformResponse: (data: ApiPeopleResponse) => parsePeopleResponse(data),
    }),
    getPerson: builder.query<Person, Person['id']>({
      query: (id) => `/people/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'People', id }],
      transformResponse: (data: ApiPersonResponse) => parsePersonResponse(data),
    }),
    getPeopleOptions: builder.query<PeopleOptions, void>({
      query: () =>
        `/people/light${convertToQueryArg<PeopleOptions>({
          'order[name]': 'asc',
          pagination: false,
        })}`,
      providesTags: ['PeopleOptions'],
      transformResponse: (data: ApiPeopleOptionsResponse) => parsePeopleOptionsResponse(data),
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonQuery, useGetPeopleOptionsQuery } = peopleSlice;
