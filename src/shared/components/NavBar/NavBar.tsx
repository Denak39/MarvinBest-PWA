import { NavLink } from 'react-router-dom';

import IconAdd from '@shared/components/Icons/IconAdd';
import IconHome from '@shared/components/Icons/IconHome';
import IconUsers from '@shared/components/Icons/IconUsers';

import './Navbar.scss';

function Navbar() {
  return (
    <div className="shadow-nav">
      <div className="navigation">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : 'not-active')}
            >
              <IconHome />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) => (isActive ? 'active' : 'not-active')}
            >
              <IconUsers />
            </NavLink>
          </li>
          <div className="indicator">
            <NavLink to="/sentence-form">
              <IconAdd />
            </NavLink>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
