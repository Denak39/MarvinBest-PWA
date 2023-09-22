/* eslint-disable import/prefer-default-export */

import type { RootState } from '@app/types';
import { peopleSlice } from '@people/slice';
import type { People } from '@people/types';

export const selectPeople = (state: RootState): People =>
  peopleSlice.endpoints.getPeople.select()(state).data ?? [];
