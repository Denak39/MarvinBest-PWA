import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from '@app/store';
import { SentenceIndexedDBContextProvider } from '@sentences/context';
import App from '@src/App';

import '@styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <SentenceIndexedDBContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SentenceIndexedDBContextProvider>
    </Provider>
  </StrictMode>
);
