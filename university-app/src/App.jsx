import React from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from "./components/header";

import StudentsPageContainer from "./containers/StudentsPageContainer";
import GroupsPageContainer from "./containers/GroupsPageContainer";
import TeachersPageContainer from "./containers/TeachersPageContainer";
import AddStudentToGroupsPageContainer from "./containers/AddStudentToGroupsPageContainer";
import AddGroupsToTeacherPageContainer from "./containers/AddGroupsToTeacherPageContainer";
import GetByIdPageContainer from "./containers/GetByIdPageContainer";

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route path="/"
                 render={() => <h2>Welcome to university Data Base</h2>}
                 exact/>
          <Route path="/students" exact component={StudentsPageContainer}/>
          <Route path="/groups" exact component={GroupsPageContainer}/>
          <Route path="/teachers" exact component={TeachersPageContainer}/>

          <Route path="/addstudent" exact component={AddStudentToGroupsPageContainer}/>
          <Route path="/addgroups" exact component={AddGroupsToTeacherPageContainer}/>
          <Route path="/getbyid" exact component={GetByIdPageContainer}/>

          <Route render={() => <h2>Page not found</h2>}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
