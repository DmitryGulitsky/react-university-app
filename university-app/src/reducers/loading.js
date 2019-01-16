import { REQUEST_STUDENTS, GET_STUDENTS } from '../actions';

function reducer(state = false, action) {
  switch (action.type) {
    case REQUEST_STUDENTS:
      return true;

    case GET_STUDENTS:
      return false;

    default:
      return state;
  }
}

export default reducer;