import { Route, Routes } from 'react-router-dom';
import { screen } from '@testing-library/react';

import { PATHS } from '@constants/index';
import Layout from '@shared/Layout/Layout';
import { navigatorOnLineMock } from '@src/tests/helpers';
import { render } from '@tests/index';

describe('shared/components/Layout', () => {
  it('should renders the home page', () => {
    render(
      <Routes>
        <Route element={<Layout />}>
          <Route path={PATHS.HOME} element={<p>Home</p>} />
        </Route>
      </Routes>
    );

    const layout = screen.getByTestId('Layout');
    const alert = screen.queryByTestId('Alert');
    const modal = screen.queryByTestId('Modal');
    const navBar = screen.getByTestId('NavBar');

    expect(layout).toHaveClass('Layout');
    expect(layout).toHaveTextContent('Home');
    expect(alert).not.toBeVisible();
    expect(modal).not.toBeVisible();
    expect(navBar).toBeInTheDocument();
  });

  it('should renders the people page', () => {
    render(
      <Routes>
        <Route element={<Layout />}>
          <Route path={PATHS.PEOPLE} element={<p>People</p>} />
        </Route>
      </Routes>,
      { initialEntries: [PATHS.PEOPLE] }
    );

    const navBar = screen.getByTestId('NavBar');

    expect(navBar).toBeInTheDocument();
  });

  it('should renders the person page', () => {
    render(
      <Routes>
        <Route element={<Layout />}>
          <Route path={PATHS.PERSON} element={<p>Person</p>} />
        </Route>
      </Routes>,
      { initialEntries: [PATHS.PERSON] }
    );

    const navBar = screen.queryByTestId('NavBar');

    expect(navBar).not.toBeInTheDocument();
  });

  it('should renders the offline alert', () => {
    navigatorOnLineMock(false);

    render(
      <Routes>
        <Route element={<Layout />}>
          <Route path={PATHS.HOME} element={<p>Home</p>} />
        </Route>
      </Routes>
    );

    const alert = screen.getByTestId('Alert');
    const iconOffline = screen.getByTestId('IconOffline');

    expect(alert).toBeVisible();
    expect(alert).toHaveTextContent('Vous n’êtes plus connecté à Internet.');
    expect(alert).toContainElement(iconOffline);
  });
});
