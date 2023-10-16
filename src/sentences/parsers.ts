/* eslint-disable import/no-cycle */

import { parseIdResponse } from '@api/parsers';
import type { ApiData, ApiSentenceResponse, ApiShortSentenceData } from '@api/types';
import DateHelpers from '@helpers/DateHelpers';
import { parseShortPersonData } from '@people/parsers';
import type { Sentence, ShortSentence } from '@sentences/types';

/**
 * Return createdAt value.
 *
 * @param {Sentence['createdAt']} createdAt Created datetime
 * @return {Sentence['createdAt']}
 */
const getCreatedAt = (createdAt: Sentence['createdAt']): Sentence['createdAt'] => {
  const createdAtDate = new DateHelpers(createdAt);

  // Because old messages don't have associated dates, they have the initial start date.
  const hideCreatedAt = createdAtDate.isSameDate(new Date('1970-01-01'));

  if (hideCreatedAt || !createdAtDate.toJSON()) return '';
  return createdAt;
};

/**
 * Parse short sentence data.
 *
 * @param {ApiData<ApiShortSentenceData>} data Data
 * @return {ShortSentence}
 */
export function parseShortSentenceData(data: ApiData<ApiShortSentenceData>): ShortSentence {
  return {
    createdAt: getCreatedAt(data.createdAt),
    id: parseIdResponse(data['@id']),
    message: data.sentence,
  };
}

/**
 * Parse sentence response.
 *
 * @param {ApiSentenceResponse|Omit<ApiSentenceResponse, '@context'>} data Data
 * @return {Sentence}
 */
export function parseSentenceResponse(
  data: ApiSentenceResponse | Omit<ApiSentenceResponse, '@context'>
): Sentence {
  return {
    ...parseShortSentenceData(data),
    person: parseShortPersonData(data.speaker),
  };
}
