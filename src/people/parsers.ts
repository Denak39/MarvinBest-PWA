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

/**
 * Parse person response.
 *
 * @param {ApiPersonResponse|Omit<ApiPersonResponse, '@context'>} data Data
 * @return {Person}
 */
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

/**
 * Parse people response.
 *
 * @param {ApiPeopleResponse} data Data
 * @return {CollectionResponse<People>}
 */
export function parsePeopleResponse(data: ApiPeopleResponse): CollectionResponse<People> {
  return {
    totalPages: findPage(data['hydra:view']['hydra:last']),
    data: data['hydra:member'].map((item) => parsePersonResponse(item)),
  };
}

/**
 * Parse people options response.
 *
 * @param {ApiPeopleOptionsResponse} data Data
 * @return {PeopleOptions}
 */
export function parsePeopleOptionsResponse(data: ApiPeopleOptionsResponse): PeopleOptions {
  return data['hydra:member'].map((item) => ({
    id: parseIdResponse(item['@id']),
    name: item.name,
  }));
}
