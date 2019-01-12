import React, { Component } from 'react';
import './App.css';

// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from './components/Header'
import Table from './components/Table'
import Form from './components/Form';
import HeaderContainer from "./containers/HeaderContainer";
import TableContainer from "./containers/TableContainer";
import FormContainer from "./containers/FormContainer";

// import {
//   StudentsPage,
//   GroupsPage,
//   TeachersPage
// } from './pages';

function App() {
  return (
    <div>
      <HeaderContainer/>
      <TableContainer/>
      <FormContainer/>
    </div>
  );
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
