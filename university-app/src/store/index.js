import { createStore, applyMiddleware } from 'redux';

import reducer from '../reducers';

const store = createStore(reducer);



// import promise from 'redux-promise';
// import thunk from 'redux-thunk'; // используется для того, чтобы в функциях была возможность сгенерировать несколько действий. Несколько действий в рамках одной функции
//
// import reducer from '../reducers';
//
// const store = createStore(reducer, applyMiddleware(promise, thunk));

export default store;