import { NavLink } from 'react-router-dom';

import IconAdd from '@components/Icons/IconAdd';
import IconHome from '@components/Icons/IconHome';
import IconUsers from '@components/Icons/IconUsers';
import PATHS from '@constants/index';

import '@components/NavBar/NavBar.scss';

function NavBar() {
  return (
    <header className="NavBar">
      <nav>
        <ul className="NavBar__list">
          <li className="NavBar__item">
            <NavLink to={PATHS.HOME}>
              <IconHome />
            </NavLink>
          </li>

          <li className="NavBar__item">
            <NavLink to={PATHS.USERS}>
              <IconUsers />
            </NavLink>
          </li>

          <li className="NavBar__item">
            <NavLink to={PATHS.SENTENCE_FORM}>
              <IconAdd />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
