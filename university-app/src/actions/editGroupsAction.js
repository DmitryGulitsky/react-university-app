import axios from 'axios';

export const REQUEST_GROUPS = 'REQUEST_GROUPS';
export const GET_GROUPS = 'GET_GROUP';
export const DATA_GROUP_TO_UPDATE = 'DATA_GROUP_TO_UPDATE';
export const ADD_GROUP = 'ADD_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const UPDATE_GROUP = 'UPDATE_GROUP';

const apiURL = 'http://localhost:8080/university';

export function getGroups() {
  return dispatch => {
    dispatch({
      type: REQUEST_GROUPS
    });
    return axios.get(`${apiURL}/groups/`).then(function(response) {
      console.log('response.data', response.data);
      console.log('response.status', response.status);
      return response;
    }).then(response => response.data).then(groups => dispatch({
      type: GET_GROUPS,
      groups
    }));
  };
}

export const dataGroupToUpdate = (dataGroupToUpdate) => {
  return dispatch => {
    dispatch({
      type: DATA_GROUP_TO_UPDATE,
      dataGroupToUpdate
    });
  };
};

export function addGroup({number}, teacher) {
  return axios.post(`${apiURL}/groups/?curatorId=${teacher}`, {
    number
  }).then(function(response) {
    console.log('response.data', response.data);
    console.log('response.status', response.status);
    return response;
  }).then(response => response.data).then(groupToAdd => ({
    type: ADD_GROUP,
    groupToAdd
  }));
}

export function deleteGroup(id) {
  return axios.delete(`${apiURL}/groups/${id}`).then(response => ({
    type: DELETE_GROUP,
    id
  }));
}

export function updateGroup(id, {number, teacher}) {
  return axios.put(`${apiURL}/groups/${id}`,
      {
        number,
        teacher
      }).then(response => response.data).then(groupToUpdate => ({
    type: UPDATE_GROUP,
    groupToUpdate
  }));

}