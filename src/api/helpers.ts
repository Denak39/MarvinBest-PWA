/* eslint-disable import/prefer-default-export */

import type { ApiQueryArg } from '@api/types';

export function formatQueryArg(args: Partial<ApiQueryArg> | void): string {
  if (!args) return '';

  return `?${Object.entries(args)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')}`;
}
