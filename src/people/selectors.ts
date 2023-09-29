import { createSelector } from '@reduxjs/toolkit';

import type { CollectionResponse } from '@api/types';
import type { RootState } from '@app/types';
import { peopleSlice } from '@people/slice';
import type { People, PeopleOptions, Person } from '@people/types';

// People
const selectPeopleState = (state: RootState): CollectionResponse<People> | undefined =>
  peopleSlice.endpoints.getPeople.select()(state).data;

export const selectPersonById = createSelector(
  selectPeopleState,
  (_: RootState, id: Person['id']) => id,
  (peopleResponse: CollectionResponse<People> | undefined, id: Person['id']): Person | undefined =>
    peopleResponse?.data.find((person) => person.id === id)
);

// People options
export const selectPeopleOptions = (state: RootState): PeopleOptions =>
  peopleSlice.endpoints.getPeopleOptions.select()(state).data ?? [];
