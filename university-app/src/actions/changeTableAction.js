export const MAIN_PAGE = 'MAIN_PAGE';
export const STUDENTS_PAGE = 'STUDENTS_PAGE';
export const GROUPS_PAGE = 'GROUPS_PAGE';
export const TEACHERS_PAGE = 'TEACHERS_PAGE';

export function goToMainPageAction(urlPage) {
  return {
    type: MAIN_PAGE,
    urlPage
  }
}

export function goToStudentsPageAction(urlPage) {
  return {
    type: STUDENTS_PAGE,
    urlPage
  }
}

export function goToGroupsPageAction(urlPage) {
  return {
    type: GROUPS_PAGE,
    urlPage
  }
}

export function goToTeachersPageAction(urlPage) {
  return {
    type: TEACHERS_PAGE,
    urlPage
  }
}
