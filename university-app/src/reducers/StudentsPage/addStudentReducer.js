import {ADD_STUDENT} from "../../actions/index";

export default function reducer(state = {}, action) {
  switch (action.type) {

    case ADD_STUDENT:
      return action.studentToAdd;

    default:
      return state;
  }
}