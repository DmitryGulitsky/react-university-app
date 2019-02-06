import React, {Component} from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import Header from './components/header';

import StudentsPageContainer
  from './components/pages/studentsPage/StudentsPage';
import GroupsPageContainer from './components/pages/groupsPage/GroupsPage';
import TeachersPageContainer
  from './components/pages/teachersPage/TeachersPage';

export default class App extends Component {

  constructor(props) {
    super(props);
  }
  render(){
  return (
      <Router>
        <LoadingOverlay
            active={this.props.loading}
            spinner
            text="Loading..."
        >
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
        </LoadingOverlay>
      </Router>
  )};
}