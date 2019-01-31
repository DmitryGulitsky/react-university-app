import {GET_STUDENTS, DELETE_STUDENT} from '../../actions/index';

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_STUDENTS:    // получаем данные с сервера. Возвращаем массив с полученными данными
      return action.students;

//    case ADD_STUDENT:
//      return action.studentsToAdd;

    case DELETE_STUDENT:
      const index = state.findIndex(student => student.id === action.id);

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];

//    case UPDATE_STUDENT:
//      return action.studentsToUpdate;

    default:
      return state;
  }
}