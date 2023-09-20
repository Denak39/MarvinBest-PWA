import { Outlet } from 'react-router-dom';

import '@components/Layout/Layout.scss';

function Layout(): JSX.Element {
  return (
    <main className="Layout" data-testid="Layout">
      <Outlet />
    </main>
  );
}

export default Layout;
