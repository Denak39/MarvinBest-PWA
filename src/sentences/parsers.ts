/* eslint-disable import/prefer-default-export */
import { parseIdResponse } from '@api/parsers';
import type { ApiSentenceResponse } from '@api/types';
import DateHelpers from '@helpers/DateHelpers';
import type { Sentence } from '@sentences/types';

export function parseSentenceResponse(
  data: ApiSentenceResponse | Omit<ApiSentenceResponse, '@context'>
): Sentence {
  const getCreatedAt = () => {
    const createdAtDate = new DateHelpers(data.createdAt);
    const hideCreatedAt = createdAtDate.isSameDate(new Date('1970-01-01'));

    if (hideCreatedAt || !createdAtDate.toJSON()) return '';

    return data.createdAt;
  };

  return {
    createdAt: getCreatedAt(),
    id: parseIdResponse(data['@id']),
    message: data.sentence,
  };
}
