import React from "react";
import PropTypes from "prop-types";

export const Navbar = ({ icon, title }) => {
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} />
        &nbsp; {title}
      </h1>
    </div>
  );
};

export default Navbar 
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
