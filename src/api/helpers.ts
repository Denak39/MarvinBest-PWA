import type { ApiQueryArg } from '@api/types';

/**
 * Convert object to query arguments.
 *
 * @template T
 * @param {ApiQueryArg<T>|void} arg Arguments
 * @return {string}
 */
export function convertToQueryArg<T>(arg: ApiQueryArg<T> | void): string {
  if (!arg || !Object.keys(arg)) return '';

  return `?${Object.entries(arg)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')}`;
}

/**
 * Return page number in URI.
 *
 * @param {string} str URI string
 * @return {number}
 */
export function findPage(str: string): number {
  return parseInt(String(str.match(/page=([0-9]+)/)?.[1]), 10) ?? 1;
}
