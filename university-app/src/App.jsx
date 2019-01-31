import React from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from './components/header';

import StudentsPageContainer
  from './containers/studentsPage/StudentsPageContainer';
import GroupsPageContainer from './containers/groupsPage/GroupsPageContainer';
import TeachersPageContainer
  from './containers/teachersPage/TeachersPageContainer';

function App() {
  return (
      <Router>
        <div className="App">
          <Header/>
          <Switch>
            <Route path="/"
                   render={() =>
                       <div>
                         <h2 className="gradient-background">Welcome to
                           university Data Base</h2>
                       </div>
                   }
                   exact/>
            <Route path="/students" exact component={StudentsPageContainer}/>
            <Route path="/groups" exact component={GroupsPageContainer}/>
            <Route path="/teachers" exact component={TeachersPageContainer}/>
            <Route render={() => <h2>Page not found</h2>}/>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
