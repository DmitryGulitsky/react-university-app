import axios from 'axios';
import {UPLOAD_SPINNER_ACTION} from "./editStudentsAction";

export const REQUEST_TEACHERS = 'REQUEST_TEACHERS';
export const GET_TEACHERS = 'GET_TEACHERS';
export const ADD_TEACHER = 'ADD_TEACHER';
export const DELETE_TEACHER = 'DELETE_TEACHER';
export const UPDATE_TEACHER = 'UPDATE_TEACHER';

const apiURL = 'http://localhost:8080/university';

export function getTeachers() {
  return dispatch => {
    dispatch({
      type: REQUEST_TEACHERS
    });
    return axios.get(`${apiURL}/teachers/`)
      .then(response => response.data)
      .then(teachers => dispatch({
        type: GET_TEACHERS,
        teachers
      }));
  };
}

export function addTeacher({firstName, lastName}) {
   return dispatch => {
     dispatch({
       type: UPLOAD_SPINNER_ACTION
     });
    return axios.post(`${apiURL}/teachers/`, {
      firstName,
      lastName
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
      .then(teacherToAdd => ({
        type: ADD_TEACHER,
        teacherToAdd
      }))

   }
}

export function deleteTeacher(id) {
  return axios.delete(`${apiURL}/teachers/${id}`)
    .then(response => ({
      type: DELETE_TEACHER,
      id
    }));
}

export function updateTeacher(id, {firstName, lastName}) {
   return dispatch => {
     dispatch({
       type: UPLOAD_SPINNER_ACTION
     });
    return axios.put(`${apiURL}/teachers/${id}`, {
      firstName,
      lastName
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
      .then(teacherToUpdate => ({
        type: UPDATE_TEACHER,
        teacherToUpdate
      }))

   }
}
