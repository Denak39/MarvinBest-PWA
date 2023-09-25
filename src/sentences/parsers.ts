/* eslint-disable import/prefer-default-export */

import { parseIdResponse } from '@api/parsers';
import type { ApiSentenceResponse } from '@api/types';
import type { Sentence } from '@sentences/types';

export function parseSentenceResponse(
  data: ApiSentenceResponse | Omit<ApiSentenceResponse, '@context'>
): Sentence {
  return {
    createdAt: data.createdAt,
    id: parseIdResponse(data['@id']),
    message: data.sentence,
  };
}
