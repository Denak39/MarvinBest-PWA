import { NavLink } from "react-router-dom";
import "./styles/Navbar.scss";
import iconHome from "@assets/icons/icon-home.svg";
// import iconAdd from "@assets/icons/icon-add.svg";
import iconUsers from "@assets/icons/icon-users.svg";

import iconAdd from "@assets/icons/icon-add.svg";

const Navbar: React.FC = () => {
  return (
    <>
      <div className="shadow-nav" />
      <div className="navigation">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <img src={iconHome} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <img src={iconUsers} />
            </NavLink>
          </li>
          <div className="indicator">
            <NavLink to="/sentence-form">
              <img src={iconAdd} />
            </NavLink>
          </div>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
