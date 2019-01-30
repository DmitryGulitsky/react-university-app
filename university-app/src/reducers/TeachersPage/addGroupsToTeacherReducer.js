import {ADD_GROUPS_TO_TEACHER} from "../../actions/index";

export default function reducer(state = [], action) {
  switch (action.type) {

    case ADD_GROUPS_TO_TEACHER:
      return [...state, action.uploadedGroupsToTeacherFiles];

    default:
      return state;
  }
}