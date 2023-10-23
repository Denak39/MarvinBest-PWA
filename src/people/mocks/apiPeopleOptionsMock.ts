import type { ApiPeopleOptionsResponse } from '@api/types';

const apiPeopleOptionsMock: ApiPeopleOptionsResponse = {
  '@context': '/api/contexts/Person',
  '@id': '/api/people/light',
  '@type': 'hydra:Collection',
  'hydra:totalItems': 4,
  'hydra:member': [
    {
      '@id': '/api/people/1',
      '@type': 'Person',
      id: 1,
      name: 'Ange Lefebvre',
    },
    {
      '@id': '/api/people/2',
      '@type': 'Person',
      id: 2,
      name: 'Chloé Lambert',
    },
    {
      '@id': '/api/people/3',
      '@type': 'Person',
      id: 3,
      name: 'Léa Masson',
    },
    {
      '@id': '/api/people/4',
      '@type': 'Person',
      id: 4,
      name: 'Mathis Robert',
    },
  ],
  'hydra:view': {
    '@id': '/api/people/light?order%5Bname%5D=asc\u0026pagination=false',
    '@type': 'hydra:PartialCollectionView',
  },
  'hydra:search': {
    '@type': 'hydra:IriTemplate',
    'hydra:template': '/api/people/light{?order[name]}',
    'hydra:variableRepresentation': 'BasicRepresentation',
    'hydra:mapping': [
      {
        '@type': 'IriTemplateMapping',
        property: 'name',
        required: false,
        variable: 'order[name]',
      },
    ],
  },
};

export default apiPeopleOptionsMock;
