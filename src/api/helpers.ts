/* eslint-disable import/prefer-default-export */

import type { ApiQueryArg } from '@api/types';

export function convertToQueryArg<T>(args: ApiQueryArg<T> | void): string {
  if (!args || !Object.keys(args)) return '';

  return `?${Object.entries(args)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')}`;
}
