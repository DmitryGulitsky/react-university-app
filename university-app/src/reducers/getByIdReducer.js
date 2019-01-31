import {
  GET_STUDENTS_BY_ID,
  GET_TEACHERS_BY_ID,
  GET_GROUPS_BY_ID
} from '../actions';

export default function reducer(state = [], action) {
  switch (action.type) {

    case GET_STUDENTS_BY_ID:
      return action.getById;

    case GET_TEACHERS_BY_ID:
      return action.getById;

    case GET_GROUPS_BY_ID:
      return action.getById;

    default:
      return state;
  }
}