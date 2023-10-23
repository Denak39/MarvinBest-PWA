import type { ApiPeopleResponse } from '@api/types';

const apiPeopleFirstPageMock: ApiPeopleResponse = {
  '@context': '/api/contexts/Person',
  '@id': '/api/people',
  '@type': 'hydra:Collection',
  'hydra:totalItems': 11,
  'hydra:member': [
    {
      '@id': '/api/people/1',
      '@type': 'Person',
      id: 1,
      name: 'Ange Lefebvre',
      bestOfs: [
        {
          '@id': '/api/best_ofs/1',
          '@type': 'BestOf',
          sentence: 'A beautiful sentence',
          createdAt: '2000-03-16 21:42:13',
        },
      ],
      countOfBestOfs: 1,
    },
    {
      '@id': '/api/people/2',
      '@type': 'Person',
      id: 2,
      name: 'Chloé Lambert',
      bestOfs: [
        {
          '@id': '/api/best_ofs/2',
          '@type': 'BestOf',
          sentence: 'A beautiful sentence',
          createdAt: '1970-01-01 00:00:00',
        },
        {
          '@id': '/api/best_ofs/3',
          '@type': 'BestOf',
          sentence: 'A beautiful sentence',
          createdAt: '2000-03-16 21:42:13',
        },
        {
          '@id': '/api/best_ofs/4',
          '@type': 'BestOf',
          sentence: 'A beautiful sentence',
          createdAt: '2000-03-16 21:42:13',
        },
      ],
      countOfBestOfs: 3,
    },
    {
      '@id': '/api/people/3',
      '@type': 'Person',
      id: 3,
      name: 'Léa Masson',
      bestOfs: [],
      countOfBestOfs: 0,
    },
    {
      '@id': '/api/people/4',
      '@type': 'Person',
      id: 4,
      name: 'Mathis Robert',
      bestOfs: [
        {
          '@id': '/api/best_ofs/5',
          '@type': 'BestOf',
          sentence: 'A beautiful sentence',
          createdAt: '2000-03-16 21:42:13',
        },
        {
          '@id': '/api/best_ofs/6',
          '@type': 'BestOf',
          sentence: 'A beautiful sentence',
          createdAt: '2000-03-16 21:42:13',
        },
      ],
      countOfBestOfs: 2,
    },
    {
      '@id': '/api/people/5',
      '@type': 'Person',
      id: 5,
      name: 'Gaultier Baudouin',
      bestOfs: [
        {
          '@id': '/api/best_ofs/7',
          '@type': 'BestOf',
          sentence: 'A beautiful sentence',
          createdAt: '2000-03-16 21:42:13',
        },
      ],
      countOfBestOfs: 1,
    },
    {
      '@id': '/api/people/6',
      '@type': 'Person',
      id: 6,
      name: 'Lucien Thibault',
      bestOfs: [],
      countOfBestOfs: 0,
    },
    {
      '@id': '/api/people/7',
      '@type': 'Person',
      id: 7,
      name: 'Sophie Vivienne',
      bestOfs: [],
      countOfBestOfs: 0,
    },
    {
      '@id': '/api/people/8',
      '@type': 'Person',
      id: 8,
      name: 'Sophie Vivienne',
      bestOfs: [],
      countOfBestOfs: 0,
    },
    {
      '@id': '/api/people/9',
      '@type': 'Person',
      id: 9,
      name: 'Agnès Ève',
      bestOfs: [],
      countOfBestOfs: 0,
    },
    {
      '@id': '/api/people/10',
      '@type': 'Person',
      id: 10,
      name: 'Sarah Maryvonne',
      bestOfs: [],
      countOfBestOfs: 0,
    },
  ],
  'hydra:view': {
    '@id': '/api/people?order%5Bname%5D=asc&page=1',
    '@type': 'hydra:PartialCollectionView',
    'hydra:first': '/api/people?order%5Bname%5D=asc&page=1',
    'hydra:last': '/api/people?order%5Bname%5D=asc&page=2',
    'hydra:next': '/api/people?order%5Bname%5D=asc&page=2',
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

export default apiPeopleFirstPageMock;
