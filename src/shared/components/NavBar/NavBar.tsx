import { memo } from 'react';
import { NavLink } from 'react-router-dom';

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
            <NavLink
              to={PATHS.SENTENCE_FORM}
              aria-label="Ajouter une phrase"
              className="IconButton IconButton--variant-primary IconButton--size-large"
            >
              <IconAdd />
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

export default memo(NavBar);
