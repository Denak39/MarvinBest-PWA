/* eslint-disable import/prefer-default-export */
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import apiPeopleFirstPageMock from '@people/mocks/apiPeopleFirstPageMock';
import apiPeopleOptionsMock from '@people/mocks/apiPeopleOptionsMock';
import apiPeopleSecondPageMock from '@people/mocks/apiPeopleSecondPageMock';
import apiPersonMock from '@people/mocks/apiPersonMock';
import apiLastSentenceMock from '@sentences/mocks/apiLastSentenceMock';
import apiSentenceMock from '@sentences/mocks/apiSentenceMock';
import { API_PATHS } from '@tests/constants';

export const server = setupServer(
  rest.get(API_PATHS.PEOPLE_OPTIONS, (_req, res, ctx) => res(ctx.json(apiPeopleOptionsMock))),
  rest.get(API_PATHS.PERSON, (_req, res, ctx) => res(ctx.json(apiPersonMock))),
  rest.get(API_PATHS.PEOPLE, (req, res, ctx) => {
    const page = parseInt(String(req.url.searchParams.get('page')), 10);

    switch (page) {
      case 1:
        return res(ctx.json(apiPeopleFirstPageMock));
      case 2:
        return res(ctx.json(apiPeopleSecondPageMock));
      default:
        return res(ctx.status(404));
    }
  }),
  rest.get(API_PATHS.LAST_SENTENCE, (_req, res, ctx) => res(ctx.json(apiSentenceMock))),
  rest.post(API_PATHS.SENTENCES, (_req, res, ctx) => res(ctx.json(apiLastSentenceMock)))
);
