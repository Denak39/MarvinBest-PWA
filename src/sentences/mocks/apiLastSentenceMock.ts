import type { ApiSentenceResponse } from '@api/types';

const apiLastSentenceMock: ApiSentenceResponse = {
  '@context': '/api/contexts/BestOf',
  '@id': '/api/best_ofs/1',
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

export default apiLastSentenceMock;
