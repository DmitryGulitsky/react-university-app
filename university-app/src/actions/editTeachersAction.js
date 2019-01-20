import axios from 'axios';
import {UPLOAD_SPINNER_ACTION} from "./editStudentsAction";

export const REQUEST_TEACHERS = 'REQUEST_TEACHERS';
export const GET_TEACHERS = 'GET_TEACHERS';
export const ADD_TEACHER = 'ADD_TEACHER';
export const DELETE_TEACHER = 'DELETE_TEACHER';
export const UPDATE_TEACHER = 'UPDATE_TEACHER';

export function getTeachers() {
  return dispatch => {
    dispatch({
      type: REQUEST_TEACHERS
    });
    return axios.get('http://localhost:8080/university/teachers/')
      .then(response => response.data)
      .then(teachers => dispatch({
        type: GET_TEACHERS,
        teachers
      }));
  };
}

export function addTeacher(teachersToAdd) {
  return dispatch => {
    dispatch({
      type: UPLOAD_SPINNER_ACTION
    });
    return axios.post('http://localhost:8080/university/teachers/', {teachersToAdd})
      .then(response => response.data)
      .then(teachersToAdd => ({
        type: ADD_TEACHER,
        teachersToAdd
      }))
      .then(dispatch({
          type: UPLOAD_SPINNER_ACTION
        })
      );
  }
}

export function deleteTeacher(id) {
  return axios.delete(`http://localhost:8080/university/teachers/${id}`)
    .then(response => ({
      type: DELETE_TEACHER,
      id
    }));
}

export function updateTeacher(id, teachersToUpdate) {
  return dispatch => {
    dispatch({
      type: UPLOAD_SPINNER_ACTION
    });
    return axios.put(`http://localhost:8080/university/teachers/${id}`, {teachersToUpdate})
      .then(response => response.data)
      .then(teachersToUpdate => ({
        type: UPDATE_TEACHER,
        teachersToUpdate
      }))
      .then(dispatch({
          type: UPLOAD_SPINNER_ACTION
        })
      );
  }
}
