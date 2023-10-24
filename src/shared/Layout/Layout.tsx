import { Outlet, useLocation } from 'react-router-dom';

import { PATHS } from '@constants/index';
import ReloadModal from '@home/components/ReloadModal';
import useOnlineStatus from '@hooks/useOnlineStatus';
import Alert from '@shared/Alert/Alert';
import IconOffline from '@shared/Icons/components/IconOffline';
import NavBar from '@shared/NavBar/NavBar';

/**
 * Layout component.
 *
 * @return {JSX.Element}
 */
function Layout(): JSX.Element {
  const location = useLocation();
  const isOnline = useOnlineStatus();

  const showNavBar = [PATHS.HOME, PATHS.PEOPLE].includes(location.pathname);

  return (
    <div className="Layout" data-testid="Layout">
      <Alert isVisible={!isOnline}>
        <IconOffline />
        <p>Vous n’êtes plus connecté à Internet.</p>
      </Alert>

      <main className="Layout__content">
        <Outlet />
      </main>

      {showNavBar && <NavBar />}

      <ReloadModal />
    </div>
  );
}

export default Layout;
