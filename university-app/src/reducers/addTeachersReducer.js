import {ADD_TEACHER} from "../actions/editTableAction";

export default function reducer(state = [], action) {
  switch (action.type) {

    case ADD_TEACHER:
      return action.teachersToAdd;

    default:
      return state;
  }
}