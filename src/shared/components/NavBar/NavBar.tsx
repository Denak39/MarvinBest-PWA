import { NavLink } from 'react-router-dom';

import IconAdd from '@components/svg/IconAdd';
import IconHome from '@components/svg/IconHome';
import IconUsers from '@components/svg/IconUsers';

import './Navbar.scss';

function Navbar() {
  return (
    <>
      <div className="shadow-nav" />
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
          <div className="add-button">
            <NavLink to="/sentence-form">
              <IconAdd />
            </NavLink>
          </div>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
