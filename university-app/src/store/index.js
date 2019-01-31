import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise';  // функции, которые встраиваются в процесс действия
import thunk from 'redux-thunk';    // перехватываем объект, смотрим на него, что-либо делаем или просто пропускаем дальше

import reducer from '../reducers';

const store = createStore(reducer, applyMiddleware(promise, thunk, logger));

export default store;