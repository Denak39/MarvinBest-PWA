/* eslint-disable @typescript-eslint/no-restricted-imports */
/* eslint-disable import/prefer-default-export */

import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@app/types';

type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
