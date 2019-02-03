import {
  ADD_STUDENT_FORM_TYPE,
  UPDATE_STUDENT_FORM_TYPE,
  ADD_TEACHER_FORM_TYPE,
  UPDATE_TEACHER_FORM_TYPE,
  ADD_GROUP_FORM_TYPE,
  UPDATE_GROUP_FORM_TYPE
} from '../../actions/index';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case ADD_STUDENT_FORM_TYPE:
      return 'addStudent';

    case UPDATE_STUDENT_FORM_TYPE:
      return 'updateStudent';

    case ADD_TEACHER_FORM_TYPE:
      return 'addTeacher';

    case UPDATE_TEACHER_FORM_TYPE:
      return 'updateTeacher';

    case ADD_GROUP_FORM_TYPE:
      return 'addGroup';

    case UPDATE_GROUP_FORM_TYPE:
      return 'updateGroup';

    default:
      return state;
  }
}