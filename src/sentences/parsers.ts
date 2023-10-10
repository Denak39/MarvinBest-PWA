import { parseIdResponse } from '@api/parsers';
import type { ApiLastSentenceResponse, ApiSentenceResponse } from '@api/types';
import DateHelpers from '@helpers/DateHelpers';
import type { Sentence, SentenceWithSpeaker } from '@sentences/types';

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
 * Parse sentence response.
 *
 * @param {ApiSentenceResponse|Omit<ApiSentenceResponse, '@context'>} data Data
 * @return {Sentence}
 */
export function parseSentenceResponse(
  data: ApiSentenceResponse | Omit<ApiSentenceResponse, '@context'>
): Sentence {
  return {
    createdAt: getCreatedAt(data.createdAt),
    id: parseIdResponse(data['@id']),
    message: data.sentence,
  };
}

/**
 * Parse last sentence response.
 *
 * @param {ApiLastSentenceResponse|Omit<ApiLastSentenceResponse, '@context'>} data Data
 * @return {SentenceWithSpeaker}
 */
export function parseLastSentenceResponse(
  data: ApiLastSentenceResponse | Omit<ApiLastSentenceResponse, '@context'>
): SentenceWithSpeaker {
  return {
    ...parseSentenceResponse(data as ApiSentenceResponse),
    speaker: {
      name: data.speaker.name,
    },
  };
}
