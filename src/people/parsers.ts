import { parseIdResponse } from '@api/parsers';
import type { ApiPeopleResponse, ApiPersonResponse, CollectionResponse } from '@api/types';
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

export function parsePeopleResponse(data: ApiPeopleResponse): CollectionResponse<People> {
  return {
    page: 1 ?? data['hydra:view']['hydra:next'],
    totalPages: 1 ?? data['hydra:view']['hydra:last'],
    data: data['hydra:member'].map((item) => parsePersonResponse(item)),
  };
}
