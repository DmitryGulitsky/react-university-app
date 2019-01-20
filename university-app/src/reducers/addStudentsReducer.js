import {ADD_STUDENT} from "../actions";

export default function reducer(state = {}, action) {
  switch (action.type) {

    case ADD_STUDENT:
      return action.studentsToAdd;

    default:
      return state;
  }
}