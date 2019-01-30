import {ADD_STUDENT_TO_GROUP} from "../../actions/index";

export default function reducer(state = [], action) {
  switch (action.type) {

    case ADD_STUDENT_TO_GROUP:
      return [...state, action.uploadedStudentToGroupFiles];

    default:
      return state;
  }
}