import {ADD_TEACHER} from "../../actions/index";

export default function reducer(state = [], action) {
  switch (action.type) {

    case ADD_TEACHER:
      return action.teacherToAdd;

    default:
      return state;
  }
}