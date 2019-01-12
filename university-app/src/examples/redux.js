export function createStore(reducer, initialState) {
  let state = initialState; // переменная хранения состояния хранилища
  let callbacks = []; // переменная для хранения функции обратного вызова

  const getState = () => state; // получение состояния хранилища

  const dispatch = action => {  // обновление состояния хранилища
    state = reducer(state, action); //  передаем текущее состояние и дейсвие
    callbacks.forEach(callback => callback())// после получения нового состояния сообщим подписчикам
  }

  const subscribe = callback => {// подписка на обновления, в качестве параметра принимает функцию
    callbacks.push(callback);
    return () => callbacks.filter(cb => cb !== callback)// отписываемся. проверяем содержит ли массив переданную функцию, и удаляем ее, если содержит
  }

  dispatch({}); // инициализируем начальное состояние хранилища

  return { getState, dispatch, subscribe };

}