export const ADD_STUDENT = 'ADD_STUDENT';
export const DELETE_STUDENT = 'DELETE_ITEM';
export const EDIT_STUDENT = 'EDIT_STUDENT';

export function addStudent(firstName, lastName) {
  return {
    type: ADD_STUDENT,
    firstName,
    lastName
  }
}

export function deleteStudent(id) {
  return {
    type: DELETE_STUDENT,
    id
  }
}

export function editStudent(id, firstName, lastName) {
  return {
    type: EDIT_STUDENT,
    id,
    firstName,
    lastName
  }
}