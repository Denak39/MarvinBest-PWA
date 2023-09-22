/* eslint-disable import/prefer-default-export */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const { VITE_API_URL } = import.meta.env;

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: VITE_API_URL }),
  tagTypes: ['People'],
  endpoints: () => ({}), // Inject endpoints from other slices
});
