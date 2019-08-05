import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
// https://api.github.com/users

const UserItem = ({user: {avatar_url, login, html_url}}) => { // changed class to function
//   const { avatar_url, login, html_url } = props.user; // destructuing
  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        alt=""
        className="round-img"
        style={{ width: "60px" }}
      />
      <h3>{login}</h3>
      <div>
        {/* <a href={html_url} className="btn btn-dark btn-sm my-1">
          More
        </a> */}
        {/* We need to set More button to user's profile dynamic URL in our app
            using Router*/}
        <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">
          More
        </Link>
      </div>
    </div>
  );
};

UserItem.protoTypes = {
    user: PropTypes.object.isRequired
}
export default UserItem;
