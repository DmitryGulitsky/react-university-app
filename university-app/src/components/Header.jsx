import React from 'react';

class Header extends React.Component {

  render() {

    return (
      <div className="header d-flex">
        <h3 onClick={this.handleGoToMainPageAction}>
          University Data Base
        </h3>
        <ul className="d-flex">
          <li onClick={this.handleGoToStudentsPageAction}>
            Students
          </li>
          <li onClick={this.handleGoToGroupsPageAction}>
            Groups
          </li>
          <li onClick={this.handleGoToTeachersPageAction}>
            Teachers
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;