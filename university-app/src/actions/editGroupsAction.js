import axios from 'axios';
import {SHOW_LOADER, HIDE_LOADER} from './loaderAction';

export const GET_GROUPS = 'GET_GROUPS';
export const GET_GROUPS_BY_ID = 'GET_GROUPS_BY_ID';
export const ADD_GROUP = 'ADD_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const UPDATE_GROUP = 'UPDATE_GROUP';

const apiURL = 'http://localhost:8080/university';

export function getGroups() {
  return dispatch => {
    dispatch({
      type: SHOW_LOADER
    });
    return axios.get(`${apiURL}/groups/`).then(function(response) {
      console.log('response.data', response.data);
      console.log('response.status', response.status);
      return response;
    })
    .then(response => response.data)
    .then(groups => dispatch({
      type: GET_GROUPS,
      groups
    }))
    .then(() => {
      dispatch({
        type: HIDE_LOADER
      });
    });
  };
}

export function getGroupsById(id) { // из этой функции возвращаем другую функцию, которая принимает функцию dispatch. Делается для того, чтобы можно было генерировать несколько действий в рамках одной функции
  return dispatch => {
    dispatch({
      type: SHOW_LOADER
    });
    return axios.get(`${apiURL}/groups/getByTeacherId/${id}`)
        .then(function(response) {
          console.log('response.data', response.data);
          console.log('response.status', response.status);
          return response;
        })
        .then(response => response.data)
        .then(groups => dispatch({
          type: GET_GROUPS_BY_ID,
          groups
        }))
    .then(() => {
      dispatch({
        type: HIDE_LOADER
      });
    });
  };
}

export function addGroup(number, teacher, teachersList) {
  let teachersListToUrl = '';
  teachersList.map(teacherId => {
    console.log('teachersListToUrl', teachersListToUrl);
    return (
        teachersListToUrl += `&teacherIdList=${teacherId}`
    );
  });
  return dispatch => {
    dispatch({
      type: SHOW_LOADER
    });
    return axios.post(
        `${apiURL}/groups/?curatorId=${teacher}${teachersListToUrl}`, {
          number
        })
    .then(response => response.data)
    .then(groupToAdd => ({
      type: ADD_GROUP,
      groupToAdd
    }))
    .then(() => {
      dispatch({
        type: HIDE_LOADER
      });
    });
  }
}

export function deleteGroup(id) {
  return axios.delete(`${apiURL}/groups/${id}`).then(response => ({
    type: DELETE_GROUP,
    id
  }));
}

export function updateGroup(id, {number, teacher}) {
  return dispatch => {
    dispatch({
      type: SHOW_LOADER
    });
    return axios.put(`${apiURL}/groups/${id}`,
        {
          number,
          teacher
        }).then(response => response.data).then(groupToUpdate => ({
      type: UPDATE_GROUP,
      groupToUpdate
    }))
    .then(() => {
      dispatch({
        type: HIDE_LOADER
      });
    });
  }
}