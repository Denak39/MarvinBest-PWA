import { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { PATHS } from '@constants/index';
import IconAdd from '@shared/Icons/components/IconAdd';
import IconHome from '@shared/Icons/components/IconHome';
import IconUsers from '@shared/Icons/components/IconUsers';

/**
 * NavBar component.
 *
 * @return {JSX.Element}
 */
function NavBar(): JSX.Element {
  return (
    <header className="NavBar" data-testid="NavBar">
      <nav className="NavBar__nav">
        <ul className="NavBar__list">
          <li className="NavBar__item">
            <NavLink to={PATHS.HOME} aria-label="Aller à la page d'accueil">
              <IconHome />
            </NavLink>
          </li>

          <li className="NavBar__item">
            <NavLink
              to={PATHS.SENTENCE_ADD}
              aria-label="Aller à la page pour ajouter une phrase"
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
