import {UPDATE_TEACHER} from "../actions/editTableAction";

export default function reducer(state = [], action) {
  switch (action.type) {

    case UPDATE_TEACHER:
      return action.teachersToUpdate;

    default:
      return state;
  }
}