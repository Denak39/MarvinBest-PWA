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
            <NavLink to={PATHS.HOME} aria-label="Aller à la page d'accueil">
              <IconHome />
            </NavLink>
          </li>

          <li className="NavBar__item">
            {/* TODO: don't use button inside link. */}
            <NavLink to={PATHS.SENTENCE_FORM} aria-label="Ajouter une phrase">
              <IconButton size="large">
                <IconAdd />
              </IconButton>
            </NavLink>
          </li>

          <li className="NavBar__item">
            <NavLink to={PATHS.PEOPLE} aria-label="Aller à la page des personnes">
              <IconUsers />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
