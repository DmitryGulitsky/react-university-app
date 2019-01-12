import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers/index'
import App from './App';

import { goToMainPageAction, goToStudentsPageAction, goToGroupsPageAction, goToTeachersPageAction } from "./actions/changeTableAction";
import { changeIdAction } from "./actions/changeIdAction";

let initialData = { urlPage: "http://localhost:8080/university/students" ,  idNumber: 0 };

const store = createStore(reducer, initialData); // создаем хранилище состояния, аргументы - reducer и начальное состояние

console.log(store.getState());
store.subscribe(() => console.log(store.getState()));
store.dispatch(goToStudentsPageAction('http://localhost:8080/university/students'));
store.dispatch(changeIdAction('10'));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('root'));


