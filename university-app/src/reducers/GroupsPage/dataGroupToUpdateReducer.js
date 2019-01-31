import {DATA_GROUP_TO_UPDATE} from "../../actions/index";

export default function reducer(state = {}, action) {
  switch (action.type) {

    case DATA_GROUP_TO_UPDATE:
      return action.dataGroupToUpdate;

    default:
      return state;
  }
}