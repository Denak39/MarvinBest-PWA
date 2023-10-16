import type { ApiSentenceResponse } from '@api/types';

const apiSentenceMock: ApiSentenceResponse = {
  '@context': '/api/contexts/BestOf',
  '@id': '/api/last_best_of',
  '@type': 'BestOf',
  sentence: 'A beautiful sentence',
  speaker: {
    '@id': '/api/people/42',
    '@type': 'Person',
    id: 42,
    name: 'John Doe',
  },
  createdAt: '2000-03-16 21:42:13',
};

export default apiSentenceMock;
