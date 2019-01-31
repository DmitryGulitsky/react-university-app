import axios from 'axios';

export const REQUEST_STUDENTS_BY_ID = 'REQUEST_STUDENTS_BY_ID';
export const GET_STUDENTS_BY_ID = 'GET_STUDENT_BY_ID';

export const REQUEST_TEACHERS_BY_ID = 'REQUEST_TEACHERS_BY_ID';
export const GET_TEACHERS_BY_ID = 'GET_TEACHERS_BY_ID';

export const REQUEST_GROUPS_BY_ID = 'REQUEST_STUDENTS_BY_ID';
export const GET_GROUPS_BY_ID = 'GET_STUDENT_BY_ID';

const apiURL = 'http://localhost:8080/university';  // адрес сервера

export function getStudentsById(id) { // из этой функции возвращаем другую функцию, которая принимает функцию dispatch. Делается для того, чтобы можно было генерировать несколько действий в рамках одной функции
  return dispatch => {  // вызываем функцию до отправки запроса
    dispatch({
      type: REQUEST_STUDENTS_BY_ID
    });
    return axios.get(`${apiURL}/students/getByGroupId/${id}`).
        then(response => response.data).
        then(getById => dispatch({
          type: GET_STUDENTS_BY_ID,
          getById
        }));
  };
}

export function getTeachersById(id) { // из этой функции возвращаем другую функцию, которая принимает функцию dispatch. Делается для того, чтобы можно было генерировать несколько действий в рамках одной функции
  return dispatch => {  // вызываем функцию до отправки запроса
    dispatch({
      type: REQUEST_TEACHERS_BY_ID
    });
    return axios.get(`${apiURL}/groups/getByTeacherId/${id}`).
        then(response => response.data).
        then(getById => dispatch({
          type: GET_TEACHERS_BY_ID,
          getById
        }));
  };
}

export function getGroupsById(id) { // из этой функции возвращаем другую функцию, которая принимает функцию dispatch. Делается для того, чтобы можно было генерировать несколько действий в рамках одной функции
  return dispatch => {  // вызываем функцию до отправки запроса
    dispatch({
      type: REQUEST_GROUPS_BY_ID
    });
    return axios.get(`${apiURL}/teachers/getByGroupId/${id}`).
        then(response => response.data).
        then(getById => dispatch({
          type: GET_GROUPS_BY_ID,
          getById
        }));
  };
}