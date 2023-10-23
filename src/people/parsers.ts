/* eslint-disable import/no-cycle */

import { findPage } from '@api/helpers';
import type {
  ApiData,
  ApiPeopleOptionsResponse,
  ApiPeopleResponse,
  ApiPersonResponse,
  ApiShortPersonData,
  CollectionResponse,
} from '@api/types';
import type { People, PeopleOptions, Person, ShortPerson } from '@people/types';
import { parseShortSentenceData } from '@sentences/parsers';

/**
 * Parse short person data.
 *
 * @param {ApiData<ApiShortPersonData>} data Data
 * @return {ShortPerson}
 */
export function parseShortPersonData(data: ApiData<ApiShortPersonData>): ShortPerson {
  return {
    id: data.id,
    name: data.name,
  };
}

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
    ...parseShortPersonData(data),
    countSentences: data.countOfBestOfs,
    sentences: data.bestOfs.map((item) => parseShortSentenceData(item)),
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
    totalPages: findPage(data['hydra:view']?.['hydra:last'] ?? ''),
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
  return data['hydra:member'].map(parseShortPersonData);
}
