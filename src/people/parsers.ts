import { findPage } from '@api/helpers';
import { parseIdResponse } from '@api/parsers';
import type {
  ApiPeopleOptionsResponse,
  ApiPeopleResponse,
  ApiPersonResponse,
  CollectionResponse,
} from '@api/types';
import type { People, PeopleOptions, Person } from '@people/types';
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

export function parsePersonOptionResponse(data): Person {
  return {
    id: parseIdResponse(data['@id']),
    name: data.name,
  };
}

export function parsePeopleResponse(data: ApiPeopleResponse): CollectionResponse<People> {
  return {
    totalPages: findPage(data['hydra:view']['hydra:last']),
    data: data['hydra:member'].map((item) => parsePersonResponse(item)),
  };
}

export function parsePeopleOptionsResponse(
  data: ApiPeopleOptionsResponse
): CollectionResponse<PeopleOptions> {
  return {
    data: data['hydra:member'].map((item) => parsePersonOptionResponse(item)),
  };
}
