import type { PropsWithChildren, ReactElement } from 'react';
import type { MemoryRouterProps } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

function renderWithRouter(ui: ReactElement, props: MemoryRouterProps = { initialEntries: ['/'] }) {
  const wrapper = ({ children }: PropsWithChildren) => {
    return <MemoryRouter {...props}>{children}</MemoryRouter>;
  };

  return { ...render(ui, { wrapper }) };
}

export default renderWithRouter;
