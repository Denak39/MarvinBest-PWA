import { parseIdResponse } from '@api/parsers';
import type { ApiLastSentenceResponse, ApiSentenceResponse } from '@api/types';
import DateHelpers from '@helpers/DateHelpers';
import type { Sentence, SentenceWithSpeaker } from '@sentences/types';

const getCreatedAt = (createdAt: Sentence['createdAt']): Sentence['createdAt'] => {
  const createdAtDate = new DateHelpers(createdAt);
  const hideCreatedAt = createdAtDate.isSameDate(new Date('1970-01-01'));

  if (hideCreatedAt || !createdAtDate.toJSON()) return '';
  return createdAt;
};

export function parseSentenceResponse(
  data: ApiSentenceResponse | Omit<ApiSentenceResponse, '@context'>
): Sentence {
  return {
    createdAt: getCreatedAt(data.createdAt),
    id: parseIdResponse(data['@id']),
    message: data.sentence,
  };
}

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
