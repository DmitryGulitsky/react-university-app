import {
  CHANGE_TO_GROUPS_PAGE,
  CHANGE_TO_STUDENTS_PAGE,
  CHANGE_TO_TEACHERS_PAGE
} from '../actions';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case CHANGE_TO_STUDENTS_PAGE:
      return 'studentsPage';

    case CHANGE_TO_TEACHERS_PAGE:
      return 'teachersPage';

    case CHANGE_TO_GROUPS_PAGE:
      return 'groupsPage';

    default:
      return state;
  }
}