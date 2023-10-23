import type { BaseEntity } from '@app/types';

// Response
export type ApiData<T> = T & {
  '@id': string;
  '@type': string;
};

export type ApiCollectionResponse<T> = {
  '@context': string;
  '@id': string;
  '@type': string;
  'hydra:member': ApiData<T>[];
  'hydra:totalItems': number;
  'hydra:view': {
    '@id': string;
    '@type': string;
    'hydra:first'?: string;
    'hydra:last'?: string;
    'hydra:next'?: string;
    'hydra:previous'?: string;
  };
  'hydra:search': {
    '@type': string;
    'hydra:template': string;
    'hydra:variableRepresentation': string;
    'hydra:mapping': [
      {
        '@type': string;
        property: string;
        required: boolean;
        variable: string;
      },
    ];
  };
};

export type ApiEntityResponse<T> = ApiData<T> & {
  '@context': string;
};

export type CollectionResponse<T> = {
  data: T;
  totalPages: number;
};

// Params
// TODO: fix this, see typescriptlang.org/docs/handbook/2/mapped-types.html.
export type ApiQueryArg<T> = Partial<
  {
    [key in keyof T as `order[${string}]`]: 'asc' | 'desc';
  } & {
    page: number;
    pagination: false;
  }
>;

// People
export interface ApiPersonData extends BaseEntity {
  bestOfs: ApiData<ApiShortSentenceData>[];
  countOfBestOfs: number;
  name: string;
}
export interface ApiShortPersonData extends Pick<ApiPersonData, 'name' | 'id'> {}

export type ApiPersonResponse = ApiEntityResponse<ApiPersonData>;
export type ApiPeopleResponse = ApiCollectionResponse<ApiPersonData>;

// People options
export type ApiPeopleOptionsResponse = ApiCollectionResponse<ApiShortPersonData>;

// Sentences
export type ApiSentenceData = {
  createdAt: string;
  sentence: string;
  speaker: ApiData<ApiShortPersonData>;
};
export interface ApiShortSentenceData extends Pick<ApiSentenceData, 'createdAt' | 'sentence'> {}

export type ApiSentenceResponse = ApiEntityResponse<ApiSentenceData>;
