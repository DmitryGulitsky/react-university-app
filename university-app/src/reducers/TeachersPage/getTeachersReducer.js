import {GET_TEACHERS, DELETE_TEACHER} from "../../actions/index";

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_TEACHERS:
      return action.teachers;

    case DELETE_TEACHER:
      const index = state.findIndex(teacher => teacher.id === action.id);

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];

    default:
      return state;
  }
}