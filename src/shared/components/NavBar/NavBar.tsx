import { NavLink } from 'react-router-dom';

import IconButton from '@components/IconButton/IconButton';
import IconAdd from '@components/Icons/IconAdd';
import IconHome from '@components/Icons/IconHome';
import IconUsers from '@components/Icons/IconUsers';
import { PATHS } from '@constants/index';

import '@components/NavBar/NavBar.scss';

function NavBar() {
  return (
    <header className="NavBar">
      <nav className="NavBar__nav">
        <ul className="NavBar__list">
          <li className="NavBar__item">
            <NavLink to={PATHS.HOME}>
              <IconHome />
            </NavLink>
          </li>

          <li className="NavBar__item">
            <NavLink to={PATHS.PEOPLE}>
              <IconUsers />
            </NavLink>
          </li>

          <li className="NavBar__item">
            <NavLink to={PATHS.SENTENCE_FORM} aria-label="Ajouter une phrase">
              <IconButton size="large">
                <IconAdd />
              </IconButton>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
