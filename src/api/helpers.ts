import type { ApiQueryArg } from '@api/types';

export function convertToQueryArg<T>(args: ApiQueryArg<T> | void): string {
  if (!args || !Object.keys(args)) return '';

  return `?${Object.entries(args)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')}`;
}

export function findPage(str: string): number {
  return parseInt(String(str.match(/page=([0-9]+)/)?.[1]), 10) ?? 1;
}
