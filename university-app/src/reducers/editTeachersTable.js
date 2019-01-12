import {ADD_TEACHER, UPDATE_TEACHER, DELETE_TEACHER} from "../actions/editTeachersTableAction";

export default function reducer(state = {
  id: "",
  urlPage: "",
  studentId: "",
  firstName: "",
  lastName: ""
}, action) {  //  указываем начальное состояние
  switch (action.type) {
    case ADD_TEACHER:
      return {
        id: action.id,
        urlPage: action.urlPage,
        studentId: action.studentId,
        firstName: action.firstName,
        lastName: action.lastName
      };

    case UPDATE_TEACHER:
      return {
        id: action.id,
        urlPage: action.urlPage,
        studentId: action.studentId,
        firstName: action.firstName,
        lastName: action.lastName
      };

    case DELETE_TEACHER:
      return {
        id: action.id,
        urlPage: action.urlPage,
        studentId: action.studentId,
      };

    default:
      return state;
  }
}