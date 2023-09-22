// Generic
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
    'hydra:first': string;
    'hydra:last': string;
    'hydra:next': string;
    'hydra:previous': string;
    type: string;
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

// People
export type ApiPersonData = {
  bestOfs: ApiData<{ createdAt: string; sentence: string }>[];
  countOfBestOfs: number;
  name: string;
};

export type ApiPersonResponse = ApiEntityResponse<ApiPersonData>;
export type ApiPeopleResponse = ApiCollectionResponse<ApiPersonData>;

// Sentences
export type ApiSentenceData = {
  createdAt: string;
  sentence: string;
};

export type ApiSentenceResponse = ApiEntityResponse<ApiSentenceData>;
