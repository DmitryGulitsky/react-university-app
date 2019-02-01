import {GET_STUDENTS, GET_STUDENTS_BY_ID, DELETE_STUDENT} from '../../actions/index';

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_STUDENTS:    // получаем данные с сервера. Возвращаем массив с полученными данными
      return action.students;

    case GET_STUDENTS_BY_ID:
      return action.students;

    case DELETE_STUDENT:
      const index = state.findIndex(student => student.id === action.id);

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];

    default:
      return state;
  }
}