import React, { Component } from 'react';
import './App.css';
import './header/header.css';
// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Store from './store/store'

import {
  StudentsPage,
  GroupsPage,
  TeachersPage
} from './pages';

import Header from './header';

const initialState = { urlPage: 'http://localhost:8080' }; //  задаем начальное состояние хранилища

function updateState(state, action) {
  switch (action.type) {
    case 'MAIN_PAGE':
      return { urlPage: action.urlPage };

    case 'STUDENTS_PAGE':
      return { urlPage: action.urlPage };

    case 'GROUPS_PAGE':
      return { urlPage: action.urlPage };

    case 'TEACHERS_PAGE':
      return { urlPage: action.urlPage };

    default: return state;
  }
}

const goToMainPageAction = {type: 'MAIN_PAGE', urlPage: "http://localhost:8080"};
const goToStudentsPageAction = {type: 'STUDENTS_PAGE', urlPage: "http://localhost:8080/university/students"};
const goToGroupsPageAction = {type: 'GROUPS_PAGE', urlPage: "http://localhost:8080/university/groups"};
const goToTeachersPageAction = {type: 'TEACHERS_PAGE', urlPage: "http://localhost:8080/university/teachers"};

const store = new Store(updateState, initialState);  // updateState - хранилище делается гибким, сами пока не знаем что в нем будет храниться

class App extends Component {

  constructor(props){
    super(props);

    //  this.state = {
    //    posts: []
    //  }
  }

 componentDidMount(){

    store.subscribe(() => this.forceUpdate());

  //   const url = "http://localhost:8080/university/students"
//
  //   fetch(url, {
  //     method: "GET"
  //     }).then(response => response.json()).then(posts => {
  //       console.log("posts", posts)
  //   })
  }

  goToMainPage() {
    store.update(goToMainPageAction);
  }
  goToStudentsPage() {
    store.update(goToStudentsPageAction);
  }
  goToGroupsPage() {
    store.update(goToGroupsPageAction);
  }
  goToTeachersPage() {
    store.update(goToTeachersPageAction);
  }

  render() {
    return (
      <div className="App">
        <div className="header d-flex">
          <h3 onClick={this.goToMainPage}>
            University Data Base
          </h3>
          <ul className="d-flex">
            <li onClick={this.goToStudentsPage}>
              Students
            </li>
            <li onClick={this.goToGroupsPage}>
              Groups
            </li>
            <li onClick={this.goToTeachersPage}>
              Teachers
            </li>
          </ul>
        </div>
        <span>current url - {store.state.urlPage}</span>
      </div>
    );
  }
}

export default App;


//  <Router>
//    <div className="App">
//      <Header/>
//
//      <Switch>
//        <Route path="/"
//               render={() => <h2>Welcome to university Data Base</h2>}
//               exact/>
//        <Route path="/students" exact component={StudentsPage}/>
//        <Route path="/groups" exact component={GroupsPage}/>
//        <Route path="/teachers" exact component={TeachersPage}/>
//
//        <Route render={() => <h2>Page not found</h2>}/>
//      </Switch>
//
//    </div>
//  </Router>