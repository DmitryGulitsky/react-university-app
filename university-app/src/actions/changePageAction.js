export const CHANGE_TO_STUDENTS_PAGE = 'CHANGE_TO_STUDENTS_PAGE';
export const CHANGE_TO_TEACHERS_PAGE = 'CHANGE_TO_TEACHERS_PAGE';
export const CHANGE_TO_GROUPS_PAGE = 'CHANGE_TO_GROUPS_PAGE';

export function changeToStudentsPage() {
  return dispatch => {
    dispatch({
      type: CHANGE_TO_STUDENTS_PAGE
    });
  };
}

export function changeToTeachersPage() {
  return dispatch => {
    dispatch({
      type: CHANGE_TO_TEACHERS_PAGE
    });
  };
}

export function changeToGroupsPage() {
  return dispatch => {
    dispatch({
      type: CHANGE_TO_GROUPS_PAGE
    });
  };
}