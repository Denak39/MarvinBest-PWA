import { Outlet } from 'react-router-dom';

import NavBar from '@components/NavBar/NavBar';

import '@components/Layout/Layout.scss';

function Layout(): JSX.Element {
  return (
    <div className="Layout" data-testid="Layout">
      <main className="Layout__content">
        <Outlet />
      </main>

      <NavBar />
    </div>
  );
}

export default Layout;
