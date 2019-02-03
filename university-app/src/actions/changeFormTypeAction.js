export const ADD_STUDENT_FORM_TYPE = 'ADD_STUDENTS_FORM_TYPE';
export const UPDATE_STUDENT_FORM_TYPE = 'UPDATE_STUDENTS_FORM_TYPE';

export const ADD_TEACHER_FORM_TYPE = 'ADD_TEACHER_FORM_TYPE';
export const UPDATE_TEACHER_FORM_TYPE = 'UPDATE_TEACHER_FORM_TYPE';

export const ADD_GROUP_FORM_TYPE = 'ADD_GROUP_FORM_TYPE';
export const UPDATE_GROUP_FORM_TYPE = 'UPDATE_GROUP_FORM_TYPE';

export function addStudentFormType() {
  return dispatch => {
    dispatch({
      type: ADD_STUDENT_FORM_TYPE
    });
  };
}

export function updateStudentFormType() {
  return dispatch => {
    dispatch({
      type: UPDATE_STUDENT_FORM_TYPE
    });
  };
}

export function addTeacherFormType() {
  return dispatch => {
    dispatch({
      type: ADD_TEACHER_FORM_TYPE
    });
  };
}

export function updateTeacherFormType() {
  return dispatch => {
    dispatch({
      type: UPDATE_TEACHER_FORM_TYPE
    });
  };
}

export function addGroupFormType() {
  return dispatch => {
    dispatch({
      type: ADD_GROUP_FORM_TYPE
    });
  };
}

export function updateGroupFormType() {
  return dispatch => {
    dispatch({
      type: UPDATE_GROUP_FORM_TYPE
    });
  };
}