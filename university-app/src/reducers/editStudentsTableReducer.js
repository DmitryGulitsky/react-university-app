import {GET_STUDENTS, ADD_STUDENT, UPDATE_STUDENT, DELETE_STUDENT} from "../actions";

function studentReducer(state = {}, action) {
  switch (action.type) {
    case GET_STUDENTS:
      return action.students;

    case UPDATE_STUDENT:
      if (state.id !== action.student.id) {
        return state;
      }
      return action.student;
  }
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_STUDENTS:    // получаем данные с сервера. Возвращаем массив с полученными данными
      return action.students;

    case ADD_STUDENT:
      return [...state, action.student];

    case DELETE_STUDENT:
      const index = state.findIndex(student => student.id === action.id);

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];

    case UPDATE_STUDENT:
      return state.map(student => studentReducer(student, action));

    default:
      return state;
  }
}