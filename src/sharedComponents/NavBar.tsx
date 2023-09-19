import { NavLink } from "react-router-dom";
import "./styles/Navbar.scss";
import iconHome from "@assets/icons/icon-home.svg";
// import iconAdd from "@assets/icons/icon-add.svg";
import iconUsers from "@assets/icons/icon-users.svg";

import iconAdd from "@assets/icons/icon-add.svg";

const Navbar: React.FC = () => {
  return (
    <div className="navigation">
      <ul>
        <li className="list ">
          <a href="#">
            <span className="icon">
              <img src={iconHome} />
            </span>
          </a>
        </li>
        <li className="list active">
          <a href="#">
            {/* <span className="icon">
              <img src={iconAdd} />
            </span> */}
          </a>
        </li>
        <li className="list">
          <a href="#">
            <span className="icon">
              <img src={iconUsers} />
            </span>
          </a>
        </li>
        <div className="indicator">
          <img src={iconAdd} />
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
