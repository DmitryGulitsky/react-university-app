export const ADD_GROUP = 'ADD_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const UPDATE_GROUP = 'UPDATE_GROUP';

export function addGroup(groupId, number, teacher) {
  return {
    type: ADD_GROUP,
    groupId,
    number,
    teacher
  }
}

export function deleteGroup(groupId) {
  return {
    type: DELETE_GROUP,
    groupId
  }
}

export function updateStudent(groupId, number, teacher) {
  return {
    type: UPDATE_GROUP,
    groupId,
    number,
    teacher
  }
}