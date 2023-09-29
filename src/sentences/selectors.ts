/* eslint-disable import/prefer-default-export */

import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@app/types';
import { peopleSlice } from '@people/slice';
import type { PeopleOptions } from '@people/types';

const selectPeopleOptionsState = (state: RootState) =>
  peopleSlice.endpoints.getPeopleOptions.select()(state);

export const selectPeopleOptions = createSelector(
  selectPeopleOptionsState,
  (state): PeopleOptions => state.data ?? []
);
