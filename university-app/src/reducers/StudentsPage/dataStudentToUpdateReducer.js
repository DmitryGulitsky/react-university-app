import {DATA_STUDENT_TO_UPDATE} from '../../actions/index';

export default function reducer(state = {}, action) {
  switch (action.type) {

    case DATA_STUDENT_TO_UPDATE:
      return action.dataStudentToUpdate;

    default:
      return state;
  }
}