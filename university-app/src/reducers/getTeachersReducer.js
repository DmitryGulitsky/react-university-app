import {GET_TEACHERS, DELETE_TEACHER} from "../actions/editTableAction";

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_TEACHERS:
      return action.teachers;

//   case ADD_TEACHER:
//     return action.teachersToAdd;

    case DELETE_TEACHER:
      const index = state.findIndex(teacher => teacher.id === action.id);

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];

//    case UPDATE_TEACHER:
//      return action.teachersToUpdate;

    default:
      return state;
  }
}