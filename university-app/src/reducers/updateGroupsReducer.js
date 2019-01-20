import {UPDATE_GROUP} from "../actions/editGroupsAction";

export default function reducer(state = [], action) {
  switch (action.type) {

    case UPDATE_GROUP:
      return action.groupsToUpdate;

    default:
      return state;
  }
}