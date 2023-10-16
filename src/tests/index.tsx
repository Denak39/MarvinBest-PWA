import type { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import type { MemoryRouterProps } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import type { RenderResult } from '@testing-library/react';
import { render as defaultRender } from '@testing-library/react';

import store from '@app/store';
import { PATHS } from '@constants/index';
import { SentenceIndexedDBContextProvider } from '@sentences/context';

/**
 * Render ui.
 *
 * @param {ReactElement} ui Element to render
 * @param {MemoryRouterProps} props Props for router
 * @return {RenderResult}
 */
function render(
  ui: ReactElement,
  props: MemoryRouterProps = { initialEntries: [PATHS.HOME] }
): RenderResult {
  const wrapper = ({ children }: PropsWithChildren) => {
    return (
      <Provider store={store}>
        <SentenceIndexedDBContextProvider>
          <MemoryRouter {...props}>{children}</MemoryRouter>
        </SentenceIndexedDBContextProvider>
      </Provider>
    );
  };

  return { ...defaultRender(ui, { wrapper }) };
}

export { defaultRender, render };
