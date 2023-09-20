/* eslint-disable import/prefer-default-export */

import type { RootState } from '@app/types';
import { speakersSlice } from '@speakers/slice';
import type { Speaker } from '@speakers/types';

export const selectSpeakers = (state: RootState): Speaker[] =>
  speakersSlice.endpoints.getSpeakers.select()(state).data ?? [];
