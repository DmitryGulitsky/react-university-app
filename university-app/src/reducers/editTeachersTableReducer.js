import {GET_TEACHERS, ADD_TEACHER, UPDATE_TEACHER, DELETE_TEACHER} from "../actions/editTeachersTableAction";

function teacherReducer(state = {}, action) {
  switch (action.type) {
    case GET_TEACHERS:
      return action.teachers;

    case UPDATE_TEACHER:
      if (state.id !== action.teacher.id) {
        return state;
      }
      return action.teacher;
  }
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_TEACHERS:
      return action.teachers;

    case ADD_TEACHER:
      return [...state, action.teacher];

    case DELETE_TEACHER:
      const index = state.findIndex(teacher => teacher.id === action.id);

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];

    case UPDATE_TEACHER:
      return state.map(teacher => teacherReducer(teacher, action));

    default:
      return state;
  }
}