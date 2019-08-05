import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Navbar = ({ icon, title }) => {
  return (
    <div className="navbar bg-dark">
      <Link to="/">
        <h1>
          <i className={icon} />
          &nbsp; {title}
        </h1>
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="about">About</Link>
        </li>
        <li>
          <Link to="contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
// set some default props
Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github"
};

// proptypes
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};
