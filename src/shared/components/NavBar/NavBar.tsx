import { NavLink } from 'react-router-dom';

import IconAdd from '@components/svg/IconAdd';
import IconHome from '@components/svg/IconHome';
import IconUsers from '@components/svg/IconUsers';
import PATHS from '@constants/index';

import '@components/NavBar/Navbar.scss';

function NavBar() {
  return (
    <header className="shadow-nav">
      <nav>
        <ul>
          <li>
            <NavLink
              to={PATHS.HOME}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <IconHome />
            </NavLink>
          </li>
          <li>
            <NavLink
              to={PATHS.USERS}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <IconUsers />
            </NavLink>
          </li>
          <div className="add-button">
            <NavLink to={PATHS.SENTENCE_FORM}>
              <IconAdd />
            </NavLink>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
