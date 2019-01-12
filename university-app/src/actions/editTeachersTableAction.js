export const ADD_TEACHER = 'ADD_TEACHER';
export const DELETE_TEACHER = 'DELETE_TEACHER';
export const EDIT_TEACHER = 'EDIT_TEACHER';

let nextId = 100;

export function addTeacher(firstName, lastName) {
  return {
    type: ADD_TEACHER,
    id: nextId++,
    firstName,
    lastName
  }
}

export function deleteTeacher(id) {
  return {
    type: DELETE_TEACHER,
    id
  }
}

export function editTeacher(id, firstName, lastName) {
  return {
    type: EDIT_TEACHER,
    id,
    firstName,
    lastName
  }
}