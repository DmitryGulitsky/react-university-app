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
  }
}

class Store {
  constructor(updateState, state) {
    this._updateState = updateState;
    this._state = state;
    this._callbacks = [];
  }

  get state() {   // определим текущее состояние state
    return this._state;
  }

  update(action) {  // метод с помощью которого можно взаимодействовать с состоянием, принимает объект действия
    this._state = this._updateState(this._state, action); // аргументы - предыдущее состояние и объект действия
    this._callbacks.forEach(callback => callback());  // уведомляем подписчика о изменении состояния
  }

  subscribe(callback) {   // метод для подписки на состояние
    this._callbacks.push(callback); //  в массив добавим переданную функцию
    return () => this._callbacks = this._callbacks.filter(cb => cb !== callback)   // отписываемся. проверяем содержит ли массив переданную функцию, и удаляем ее, если содержит
  }
}

const initialState = { urlPage: 'http://localhost:8080' }; //  задаем начальное состояние хранилища

const store = new Store(updateState, initialState);  // updateState - хранилище делается гибким, сами пока не знаем что в нем будет храниться

const goToMainPageAction = {type: 'MAIN_PAGE', urlPage: "http://localhost:8080"};
const goToStudentsPageAction = {type: 'STUDENTS_PAGE', urlPage: "http://localhost:8080/university/students"};
const goGroupsPageAction = {type: 'GROUPS_PAGE', urlPage: "http://localhost:8080/university/groups"};
const goToTeachersPageAction = {type: 'TEACHERS_PAGE', urlPage: "http://localhost:8080/university/teachers"};

const unsubscribe = store.subscribe(() => console.log('State changed 1', store.state))
store.subscribe(() => console.log('State changed 2', store.state))

store.update(goToMainPageAction);
unsubscribe();
store.update(goToStudentsPageAction);
store.update(goGroupsPageAction);
store.update(goToTeachersPageAction);
