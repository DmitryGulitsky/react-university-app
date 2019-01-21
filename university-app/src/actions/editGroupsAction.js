import axios from 'axios';

export const REQUEST_GROUPS = 'REQUEST_GROUPS';
export const GET_GROUPS = 'GET_GROUP';
export const ADD_GROUP = 'ADD_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const UPDATE_GROUP = 'UPDATE_GROUP';

export const UPLOAD_SPINNER_ACTION = 'UPLOAD_SPINNER_ACTION';


export function getGroups() {
  return dispatch => {
    dispatch({
      type: REQUEST_GROUPS
    });
    return axios.get('http://localhost:8080/university/groups/upload')
      .then(response => response.data)
      .then(groups => dispatch({
        type: GET_GROUPS,
        groups
      }));
  };
}

export function addGroup(groupsToAdd) {
  return dispatch => {
    dispatch({
      type: UPLOAD_SPINNER_ACTION
    });
    return axios.post('http://localhost:8080/university/groups/', {groupsToAdd})
      .then(response => response.data)
      .then(groupsToAdd => ({
        type: ADD_GROUP,
        groupsToAdd
      }))
      .then(dispatch({
          type: UPLOAD_SPINNER_ACTION
        })
      );
  }
}

export function deleteGroup(id) {
  return axios.delete(`http://localhost:8080/university/groups/${id}`)
    .then(response => ({
      type: DELETE_GROUP,
      id
    }));
}

export function updateGroup(id, {groupsToUpdate}) {
  return dispatch => {
    dispatch({
      type: UPLOAD_SPINNER_ACTION
    });
    return axios.put(`http://localhost:8080/university/groups/${id}`, {groupsToUpdate})
      .then(response => response.data)
      .then(groupsToUpdate => ({
        type: UPDATE_GROUP,
        groupsToUpdate
      }))
      .then(dispatch({
          type: UPLOAD_SPINNER_ACTION
        })
      );
  }
}