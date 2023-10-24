import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import apiPeopleFirstPageMock from '@people/mocks/apiPeopleFirstPageMock';
import apiPeopleOptionsMock from '@people/mocks/apiPeopleOptionsMock';
import apiPeopleSecondPageMock from '@people/mocks/apiPeopleSecondPageMock';
import apiPersonMock from '@people/mocks/apiPersonMock';
import apiLastSentenceMock from '@sentences/mocks/apiLastSentenceMock';
import apiSentenceMock from '@sentences/mocks/apiSentenceMock';
import { API_PATHS } from '@tests/constants';

const server = setupServer(
  http.get(API_PATHS.PEOPLE_OPTIONS, () => new Response(JSON.stringify(apiPeopleOptionsMock))),
  http.get(API_PATHS.PERSON, () => new Response(JSON.stringify(apiPersonMock))),
  http.get(API_PATHS.PEOPLE, async ({ request }) => {
    const page = new URL(request.url).searchParams.get('page');

    switch (page) {
      case '1':
        return new Response(JSON.stringify(apiPeopleFirstPageMock));
      case '2':
        return new Response(JSON.stringify(apiPeopleSecondPageMock));
      default:
        return new HttpResponse(null, { status: 404 });
    }
  }),
  http.get(API_PATHS.LAST_SENTENCE, () => new Response(JSON.stringify(apiSentenceMock))),
  http.post(API_PATHS.SENTENCES, () => new Response(JSON.stringify(apiLastSentenceMock)))
);

export default server;
