/* eslint-disable import/prefer-default-export */

import type { CollectionResponse } from '@api/types';
import type { RootState } from '@app/types';
import { peopleSlice } from '@people/slice';
import type { People } from '@people/types';

export const selectPeople = (state: RootState): CollectionResponse<People> | undefined =>
  peopleSlice.endpoints.getPeople.select()(state).data;
