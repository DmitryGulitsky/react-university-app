import {ADD_STUDENT, UPDATE_STUDENT, DELETE_STUDENT} from "../actions/editStudentsTableAction";

export default function reducer(state = {
  id: "",
  urlPage: "",
  studentId: "",
  firstName: "",
  lastName: ""
}, action) {  //  указываем начальное состояние
  switch (action.type) {
    case ADD_STUDENT:
      return {
        id: action.id,
        urlPage: action.urlPage,
        studentId: action.studentId,
        firstName: action.firstName,
        lastName: action.lastName
      };

    case UPDATE_STUDENT:
      return {
        id: action.id,
        urlPage: action.urlPage,
        studentId: action.studentId,
        firstName: action.firstName,
        lastName: action.lastName
      };

    case DELETE_STUDENT:
      return {
        id: action.id,
        urlPage: action.urlPage,
        studentId: action.studentId,
      };

    default:
      return state;
  }
}