import type { ApiPeopleResponse } from '@api/types';

const apiPeopleSecondPageMock: ApiPeopleResponse = {
  '@context': '/api/contexts/Person',
  '@id': '/api/people',
  '@type': 'hydra:Collection',
  'hydra:totalItems': 11,
  'hydra:member': [
    {
      '@id': '/api/people/11',
      '@type': 'Person',
      id: 11,
      name: 'Coralie Josette',
      bestOfs: [],
      countOfBestOfs: 0,
    },
  ],
  'hydra:view': {
    '@id': '/api/people?order%5Bname%5D=asc&page=2',
    '@type': 'hydra:PartialCollectionView',
    'hydra:first': '/api/people?order%5Bname%5D=asc&page=1',
    'hydra:last': '/api/people?order%5Bname%5D=asc&page=2',
    'hydra:previous': '/api/people?order%5Bname%5D=asc&page=1',
  },
  'hydra:search': {
    '@type': 'hydra:IriTemplate',
    'hydra:template': '/api/people{?order[name]}',
    'hydra:variableRepresentation': 'BasicRepresentation',
    'hydra:mapping': [
      {
        '@type': 'IriTemplateMapping',
        variable: 'order[name]',
        property: 'name',
        required: false,
      },
    ],
  },
};

export default apiPeopleSecondPageMock;
