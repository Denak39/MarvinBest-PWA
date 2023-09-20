import { NavLink } from 'react-router-dom';

import iconAdd from '@assets/icons/icon-add.svg';
import iconHome from '@assets/icons/icon-home.svg';
// import iconAdd from "@assets/icons/icon-add.svg";
import iconUsers from '@assets/icons/icon-users.svg';

import './styles/Navbar.scss';

function Navbar() {
  return (
    <>
      <div className="shadow-nav" />
      <div className="navigation">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              <img src={iconHome} alt="Home" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')}>
              <img src={iconUsers} alt="Users" />
            </NavLink>
          </li>
          <div className="indicator">
            <NavLink to="/sentence-form">
              <img src={iconAdd} alt="Add" />
            </NavLink>
          </div>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
