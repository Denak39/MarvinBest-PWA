/* eslint-disable @typescript-eslint/no-restricted-imports */
/* eslint-disable import/prefer-default-export */

import { type TypedUseSelectorHook, useSelector } from 'react-redux';

import type { RootState } from '@app/types';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
