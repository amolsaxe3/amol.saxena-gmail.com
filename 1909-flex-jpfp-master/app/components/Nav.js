import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ location }) => {
  // const {pathname} = location
  return (
    <div id="nav1">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/campuses">Campuses</Link>
        <Link to="/students">Students</Link>
      </nav>
    </div>
  );
};

export default Nav;
