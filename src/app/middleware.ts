import type { Middleware } from 'redux';

const syncMiddleware: Middleware = (store) => (next) => (action) => {
  next(action);

  if (action.type === 'sentences/addSentence') {
    const state = store.getState();
    const { sentences } = state.sentences;

    localStorage.setItem('sentences', JSON.stringify(sentences));
  }
};

export default syncMiddleware;
