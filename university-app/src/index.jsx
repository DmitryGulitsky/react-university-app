import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './App';

import { getStudents, getTeachers, getGroups } from "./actions";

store.dispatch(getStudents());
//store.dispatch(getTeachers());
//store.dispatch(getGroups());

console.log(store.getState());
console.log(store);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('root'));


