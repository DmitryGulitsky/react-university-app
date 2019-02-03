import axios from 'axios';
import {SHOW_LOADER, HIDE_LOADER} from './loaderAction';

export const GET_STUDENTS = 'GET_STUDENT';
export const GET_STUDENTS_BY_ID = 'GET_STUDENTS_BY_ID';
export const ADD_STUDENT = 'ADD_STUDENT';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';

const apiURL = 'http://localhost:8080/university';

export function getStudents() {
  return dispatch => {
    dispatch({
      type: SHOW_LOADER
    });
    return axios.get(`${apiURL}/students/`)
        .then(response => response.data)
        .then(students => dispatch({
          type: GET_STUDENTS,
          students
        }))
        .then(() => {
          dispatch({
            type: HIDE_LOADER
          });
        });
  };
}

export function getStudentsById(id) {
  return dispatch => {
    dispatch({
      type: SHOW_LOADER
    });
    return axios.get(`${apiURL}/students/getByGroupId/${id}`)
        .then(response => response.data)
        .then(students => dispatch({
          type: GET_STUDENTS_BY_ID,
          students
        }))
        .then(() => {
          dispatch({
            type: HIDE_LOADER
          });
        });
  };
}

export function addStudent({firstName, lastName}, groupId) {
  return dispatch => {
    dispatch({
      type: SHOW_LOADER
    });
    return axios.post(`${apiURL}/students?groupId=${groupId}`, {
      firstName,
      lastName
    }).then(response => response.data).then(studentToAdd => ({   //  вернем объект действия
      type: ADD_STUDENT,
      studentToAdd   // передаем объект student
    }))
    .then(() => {
      dispatch({
        type: HIDE_LOADER
      });
    });
  };
}

export function deleteStudent(id) {
  return axios.delete(`${apiURL}/students/${id}`).then(response => ({
    type: DELETE_STUDENT,
    id
  }));
}

export function updateStudent(id, {firstName, lastName}, groupId) {
  return dispatch => {
    dispatch({
      type: SHOW_LOADER
    });
    return axios.put(`${apiURL}/students/${id}?groupId=${groupId}`,
        {
          firstName,
          lastName
        })
    .then(response => response.data).then(studentToUpdate => ({
      type: UPDATE_STUDENT,
      studentToUpdate
    }))
    .then(() => {
      dispatch({
        type: HIDE_LOADER
      });
    });
  };
}