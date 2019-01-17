import axios from 'axios';

export const REQUEST_GROUPS = 'REQUEST_GROUPS';
export const GET_GROUPS = 'GET_GROUP';
export const ADD_GROUP = 'ADD_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const UPDATE_GROUP = 'UPDATE_GROUP';

export function getGroups() {
  return dispatch => {
    dispatch({
      type: REQUEST_GROUPS
    });
    return axios.get('http://localhost:8080/university/groups/')
      .then(response => response.data)
      .then(groups => dispatch({
        type: GET_GROUPS,
        groups
      }));
  };
}

export function addGroup({number, teacher}) {
  return axios.post('http://localhost:8080/university/groups/', {number, teacher})
    .then(response => response.data)
    .then(group => ({
      type: ADD_GROUP,
      group
    }));
}

export function deleteGroup(id) {
  return axios.delete(`http://localhost:8080/university/groups/${id}`)
    .then(response => ({
      type: DELETE_GROUP,
      id
    }));
}

export function updateGroup(id, {number, teacher}) {
  return axios.put(`http://localhost:8080/university/groups/${id}`, {number, teacher})
    .then(response => response.data)
    .then(group => ({
      type: UPDATE_GROUP,
      group
    }));
}