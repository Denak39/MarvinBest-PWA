import { Outlet, useLocation } from 'react-router-dom';

import NavBar from '@components/NavBar/NavBar';
import { PATHS } from '@constants/index';

import '@components/Layout/Layout.scss';

function Layout(): JSX.Element {
  const location = useLocation();

  const showNavBar = [PATHS.HOME, PATHS.PEOPLE].includes(location.pathname);

  return (
    <div className="Layout" data-testid="Layout">
      <main className="Layout__content">
        <Outlet />
      </main>

      {showNavBar && <NavBar />}
    </div>
  );
}

export default Layout;
