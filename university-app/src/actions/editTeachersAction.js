import axios from 'axios';
import {SHOW_LOADER, HIDE_LOADER} from './loaderAction';
import {SHOW_POPUP} from './uploadPopupAction';

export const GET_TEACHERS = 'GET_TEACHERS';
export const GET_TEACHERS_BY_ID = 'GET_TEACHERS_BY_ID';
export const ADD_TEACHER = 'ADD_TEACHER';
export const DELETE_TEACHER = 'DELETE_TEACHER';
export const UPDATE_TEACHER = 'UPDATE_TEACHER';

const apiURL = 'http://localhost:8080/university';

export function getTeachers() {
  return dispatch => {
    dispatch({
      type: SHOW_LOADER
    });
    return axios.get(`${apiURL}/teachers/`)
    .then(response => response.data)
    .then(teachers => dispatch({
          type: GET_TEACHERS,
          teachers
        }))
    .then(() => {
      dispatch({
        type: HIDE_LOADER
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      dispatch({
        type: HIDE_LOADER
      });
    });
  };
}

export function getTeachersById(id) { // из этой функции возвращаем другую функцию, которая принимает функцию dispatch. Делается для того, чтобы можно было генерировать несколько действий в рамках одной функции
  return dispatch => {
    dispatch({
      type: SHOW_LOADER
    });
    return axios.get(`${apiURL}/teachers/getByGroupId/${id}`)
    .then(response => response.data)
    .then(teachers => dispatch({
          type: GET_TEACHERS_BY_ID,
          teachers
        }))
    .then(() => {
      dispatch({
        type: HIDE_LOADER
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      dispatch({
        type: HIDE_LOADER
      });
    });
  };
}

export function addTeacher({firstName, lastName}) {
  return dispatch => {
    dispatch({
      type: SHOW_LOADER
    });
    return axios.post(`${apiURL}/teachers/`, {
      firstName,
      lastName
    })
    .then(response => response.data)
    .then(teacherToAdd => ({
      type: ADD_TEACHER,
      teacherToAdd
    }))
    .then(() => {
      dispatch({
        type: HIDE_LOADER
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      dispatch({
        type: HIDE_LOADER
      });
    });
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
      type: SHOW_LOADER
    });
    return axios.put(`${apiURL}/teachers/${id}`, {
      firstName,
      lastName
    })
    .then(response => response.data).then(teacherToUpdate => ({
      type: UPDATE_TEACHER,
      teacherToUpdate
    }))
    .then(() => {
      dispatch({
        type: HIDE_LOADER
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      dispatch({
        type: HIDE_LOADER
      });
    });
  }
}
