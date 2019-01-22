import axios from 'axios';
import {UPLOAD_SPINNER_ACTION} from "./editStudentsAction";

export const REQUEST_GROUPS = 'REQUEST_GROUPS';
export const GET_GROUPS = 'GET_GROUP';
export const ADD_GROUP = 'ADD_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const UPDATE_GROUP = 'UPDATE_GROUP';

// export const UPLOAD_SPINNER_ACTION = 'UPLOAD_SPINNER_ACTION';

const apiURL = 'http://localhost:8080/university';

export function getGroups() {
  return dispatch => {
    dispatch({
      type: REQUEST_GROUPS
    });
    return axios.get(`${apiURL}/groups/`)
      .then(function (response) {
        console.log('response.data', response.data);
        console.log('response.status', response.status);
        return response;
      })
      .then(response => response.data)
      .then(groups => dispatch({
        type: GET_GROUPS,
        groups
      }));
  };
}

export function addGroup({number}, teacher) {
   return dispatch => {
     dispatch({
       type: UPLOAD_SPINNER_ACTION
     });
    return axios.post(`${apiURL}/groups/?teacherId=${teacher}`, {
      number
    })
      .then(function (response) {
        console.log('response.data', response.data);
        console.log('response.status', response.status);
        return response;
      })
      .then(function (response) {
        dispatch({
          type: UPLOAD_SPINNER_ACTION
        });
        return response;
      })
      .then(response => response.data)
      .then(groupToAdd => ({
        type: ADD_GROUP,
        groupToAdd
      }))

   }
}

export function deleteGroup(id) {
  return axios.delete(`${apiURL}/groups/${id}`)
    .then(response => ({
      type: DELETE_GROUP,
      id
    }));
}

export function updateGroup(id, {number, teacher}) {
   return dispatch => {
     dispatch({
       type: UPLOAD_SPINNER_ACTION
     });
    return axios.put(`${apiURL}/groups/${id}`,
      {
        number,
        teacher
      })
      .then(function (response) {
        dispatch({
          type: UPLOAD_SPINNER_ACTION
        });
        return response;
      })
      .then(response => response.data)
      .then(groupToUpdate => ({
        type: UPDATE_GROUP,
        groupToUpdate
      }))
 }
}