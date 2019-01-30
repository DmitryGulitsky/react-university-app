import React from 'react';
import {Link, withRouter} from 'react-router-dom';  // метод Link - изменение адреса, должен быть обернут в BrowserRouter

import './header.css';

const Header = () => {
  return (
    <div className="header d-flex gradient-background">
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
        <li>
          <Link to="/addstudent">Add student to group</Link>
        </li>
        <li>
          <Link to="/addgroups">Add groups to teacher</Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Header)

