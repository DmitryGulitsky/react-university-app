import axios from 'axios';

export const REQUEST_TEACHERS = 'REQUEST_TEACHERS';
export const GET_TEACHERS = 'GET_TEACHERS';
export const REQUEST_TEACHERS_BY_ID = 'REQUEST_TEACHERS_BY_ID';
export const GET_TEACHERS_BY_ID = 'GET_TEACHERS_BY_ID';
export const DATA_TEACHER_TO_UPDATE = 'DATA_TEACHER_TO_UPDATE';
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

export function getTeachersById(id) { // из этой функции возвращаем другую функцию, которая принимает функцию dispatch. Делается для того, чтобы можно было генерировать несколько действий в рамках одной функции
  return dispatch => {  // вызываем функцию до отправки запроса
    dispatch({
      type: REQUEST_TEACHERS_BY_ID
    });
    return axios.get(`${apiURL}/teachers/getByGroupId/${id}`)
    .then(function(response) {
      console.log('response.data', response.data);
      console.log('response.status', response.status);
      return response;
    })
    .then(response => response.data)
    .then(teachers => dispatch({
          type: GET_TEACHERS_BY_ID,
          teachers
        }));
  };
}

export const dataTeacherToUpdate = (dataTeacherToUpdate) => {
  return dispatch => {  // вызываем функцию до отправки запроса
    dispatch({
      type: DATA_TEACHER_TO_UPDATE,
      dataTeacherToUpdate
    });
  };
};

export function addTeacher({firstName, lastName}) {
  return axios.post(`${apiURL}/teachers/`, {
    firstName,
    lastName
  }).then(function(response) {
    console.log('response.data', response.data);
    console.log('response.status', response.status);
    return response;
  }).then(response => response.data).then(teacherToAdd => ({
    type: ADD_TEACHER,
    teacherToAdd
  }));

}

export function deleteTeacher(id) {
  return axios.delete(`${apiURL}/teachers/${id}`).then(response => ({
    type: DELETE_TEACHER,
    id
  }));
}

export function updateTeacher(id, {firstName, lastName}) {
  return axios.put(`${apiURL}/teachers/${id}`, {
    firstName,
    lastName
  }).then(function(response) {
    console.log('response.data', response.data);
    console.log('response.status', response.status);
    return response;
  }).then(response => response.data).then(teacherToUpdate => ({
    type: UPDATE_TEACHER,
    teacherToUpdate
  }));

}
