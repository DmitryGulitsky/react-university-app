import React from 'react';
import { Link } from 'react-router-dom';  // метод Link - изменение адреса, должен быть обернут в BrowserRouter

import './header.css';

const Header = () => {
  return (
    <div className="header d-flex">
      <h3>
        <Link to="/">
          University Data Base
        </Link>
      </h3>
      <ul className="d-flex">
        <li>
          <Link to="/students">Students</Link>
        </li>
        <li>
          <Link to="/groups">Groups</Link>
        </li>
        <li>
          <Link to="/teachers">Teachers</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;