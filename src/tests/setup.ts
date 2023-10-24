import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import indexeddb from 'fake-indexeddb';
import { afterEach, expect } from 'vitest';

import { api } from '@api/index';
import store from '@app/store';
import { clearDatabase } from '@tests/helpers';
import server from '@tests/server';

import 'whatwg-fetch';

// Extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// IndexedDB
globalThis.indexedDB = indexeddb;

// Window
Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });

beforeAll(() => {
  server.listen();

  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

afterEach((done) => {
  cleanup();
  vi.clearAllMocks();
  server.resetHandlers();
  store.dispatch(api.util.resetApiState());
  clearDatabase().finally(() => done);
});

afterAll(() => {
  server.close();
});
