function updateState(state, action) {
  switch (action.type) {
    case 'MAIN_PAGE':
      return action.urlPage;

    case 'STUDENTS_PAGE':
      return action.urlPage;

    case 'GROUPS_PAGE':
      return action.urlPage;

    case 'TEACHERS_PAGE':
      return action.urlPage;
  }
}

class Store {
  constructor(updateState, state) {
    this._updateState = updateState;
    this._state = state;
  }

  get state() {   // определим текущее состояние state
    return this._state;
  }

  update(action) {  // метод с помощью которого можно взаимодействовать с состоянием, принимает объект действия
    this._state = this._updateState(this._state, action); // аргументы - предыдущее состояние и объект действия
  }
}

const store = new Store(updateState, 'http://localhost:8080');  // updateState - хранилище делается гибким, сами пока не знаем что в нем будет храниться

const goToMainPageAction = {type: 'MAIN_PAGE', urlPage: "http://localhost:8080"};
const goToStudentsPageAction = {type: 'STUDENTS_PAGE', urlPage: "http://localhost:8080/university/students"};
const goGroupsPageAction = {type: 'GROUPS_PAGE', urlPage: "http://localhost:8080/university/groups"};
const goToTeachersPageAction = {type: 'TEACHERS_PAGE', urlPage: "http://localhost:8080/university/teachers"};

store.update(goToMainPageAction);
console.log(store.state);

store.update(goToStudentsPageAction);
console.log(store.state);

store.update(goGroupsPageAction);
console.log(store.state);

store.update(goToTeachersPageAction);
console.log(store.state);