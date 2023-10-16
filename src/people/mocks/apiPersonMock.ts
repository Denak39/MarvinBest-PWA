import type { ApiPersonResponse } from '@api/types';

const apiPersonMock: ApiPersonResponse = {
  '@context': '/api/contexts/Person',
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
};

export default apiPersonMock;
