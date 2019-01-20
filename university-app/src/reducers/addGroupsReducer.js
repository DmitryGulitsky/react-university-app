import {ADD_GROUP} from "../actions/editGroupsAction";

export default function reducer(state = [], action) {
  switch (action.type) {

    case ADD_GROUP:
      return action.groupsToAdd;

    default:
      return state;
  }
}