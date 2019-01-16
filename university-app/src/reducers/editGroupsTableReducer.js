import {GET_GROUPS, ADD_GROUP, UPDATE_GROUP, DELETE_GROUP} from "../actions/editGroupsTableAction";

function groupReducer(state = {}, action) {
  switch (action.type) {
    case GET_GROUPS:
      return action.groups;

    case UPDATE_GROUP:
      if (state.id !== action.group.id) {
        return state;
      }
      return action.group;
  }
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_GROUPS:
      return action.groups;

    case ADD_GROUP:
      return [...state, action.group];

    case DELETE_GROUP:
      const index = state.findIndex(group => group.id === action.id);

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];

    case UPDATE_GROUP:
      return state.map(group => groupReducer(group, action));

    default:
      return state;
  }
}