import {DATA_TEACHER_TO_UPDATE} from '../../actions/index';

export default function reducer(state = {}, action) {
  switch (action.type) {

    case DATA_TEACHER_TO_UPDATE:
      return action.dataTeacherToUpdate;

    default:
      return state;
  }
}