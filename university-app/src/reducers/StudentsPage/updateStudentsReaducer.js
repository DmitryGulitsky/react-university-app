import {UPDATE_STUDENT} from '../../actions/index';

export default function reducer(state = [], action) {
  switch (action.type) {

    case UPDATE_STUDENT:
      return action.studentToUpdate;

    default:
      return state;
  }
}