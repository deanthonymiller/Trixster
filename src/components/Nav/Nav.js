import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/user">
            Profile Page
          </Link>
        </li>
        <li>
          <Link to="/info">
            Post a Question
          </Link>
        </li>
        <li>
          <Link to="/meetup">
            Post a Meet-up
          </Link>
          
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
