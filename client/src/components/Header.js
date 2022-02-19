import React from "react";
import { Link } from "react-router-dom";

import "../style/Header.css";

const Header = () => {
  return (
    <div className="h">
      <h1 className="h-title">kitchen</h1>
      <ul className="h-menu">
        <li>
          <Link to="/" id="homelink" className="h-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/saved" id="aboutlink" className="h-link">
            Saved
          </Link>
        </li>
        <li>
          <Link to="/profile" id="profilelink" className="h-link">
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Header;
