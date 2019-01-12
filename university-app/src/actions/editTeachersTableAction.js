export const ADD_TEACHER = 'ADD_TEACHER';
export const DELETE_TEACHER = 'DELETE_TEACHER';
export const UPDATE_TEACHER = 'UPDATE_TEACHER';

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

export function updateTeacher(id, firstName, lastName) {
  return {
    type: UPDATE_TEACHER,
    id,
    firstName,
    lastName
  }
}