import {UPDATE_STUDENT} from "../actions";

export default function reducer(state = [], action) {
  switch (action.type) {

    case UPDATE_STUDENT:
      return action.studentsToUpdate;

    default:
      return state;
  }
}