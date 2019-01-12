import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './App';

import { requestPage } from './actions';
store.dispatch(requestPage());

console.log(store.getState());
// store.subscribe(() => console.log(store.getState()));
// store.dispatch(goToStudentsPageAction('http://localhost:8080/university/students'));
// store.dispatch(changeIdAction('10'));


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('root'));


