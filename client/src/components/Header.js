import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="h">
      <ul className="h-menu">
        <li>
          <Link to="/" className="h-link" id="homelink">
            Home
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Header;
