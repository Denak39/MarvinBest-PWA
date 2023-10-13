/* eslint-disable import/prefer-default-export */

import type { BaseEntity } from '@app/types';

/**
 * Parse id response.
 *
 * @param {string} data Data
 * @return {BaseEntity['id']}
 */
export function parseIdResponse(data: string): BaseEntity['id'] {
  return parseInt(data.split('/').slice(-1).join(''), 10);
}
