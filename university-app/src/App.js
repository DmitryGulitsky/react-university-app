import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {
  StudentsPage,
  GroupsPage,
  TeachersPage
} from './pages';

import Header from './header';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      posts: []
    }
  }

  componentDidMount(){
    const url = "http://localhost:8080/university/students"

    fetch(url, {
      method: "GET"
      }).then(response => response.json()).then(posts => {
        console.log("posts", posts)
    })
  }

  render() {
    return (
      <Router>
      <div className="App">
        <Header/>

          <Switch>
            <Route path="/"
                   render={() => <h2>Welcome to university Data Base</h2>}
                   exact/>
            <Route path="/students" exact component={StudentsPage}/>
            <Route path="/groups" exact component={GroupsPage}/>
            <Route path="/teachers" exact component={TeachersPage}/>

            <Route render={() => <h2>Page not found</h2>}/>
          </Switch>

      </div>
      </Router>
    );
  }
}

export default App;
