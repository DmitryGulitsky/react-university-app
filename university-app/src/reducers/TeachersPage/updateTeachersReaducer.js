import {UPDATE_TEACHER} from '../../actions/editTeachersAction';

export default function reducer(state = [], action) {
  switch (action.type) {

    case UPDATE_TEACHER:
      return action.teacherToUpdate;

    default:
      return state;
  }
}