import {GET_GROUPS, DELETE_GROUP} from "../actions";

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_GROUPS:
      return action.groups;

//    case ADD_GROUP:
//      return action.groupsToAdd;

    case DELETE_GROUP:
      const index = state.findIndex(group => group.id === action.id);

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];

//    case UPDATE_GROUP:
//      return action.groupsToUpdate;

    default:
      return state;
  }
}