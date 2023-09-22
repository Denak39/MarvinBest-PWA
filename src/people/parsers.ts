import { parseIdResponse } from '@api/parsers';
import type { ApiPeopleResponse, ApiPersonResponse } from '@api/types';
import type { People, Person } from '@people/types';
import { parseSentenceResponse } from '@sentences/parsers';

export function parsePersonResponse(
  data: ApiPersonResponse | Omit<ApiPersonResponse, '@context'>
): Person {
  return {
    countSentences: data.countOfBestOfs,
    id: parseIdResponse(data['@id']),
    name: data.name,
    sentences: data.bestOfs.map((item) => parseSentenceResponse(item)),
  };
}

export function parsePeopleResponse(data: ApiPeopleResponse): People {
  return data['hydra:member'].map((item) => parsePersonResponse(item));
}
