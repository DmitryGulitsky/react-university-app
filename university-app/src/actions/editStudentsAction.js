import axios from 'axios';

export const REQUEST_STUDENTS = 'REQUEST_STUDENTS';
export const GET_STUDENTS = 'GET_STUDENT';
export const REQUEST_STUDENTS_BY_ID = 'REQUEST_STUDENTS_BY_ID';
export const GET_STUDENTS_BY_ID = 'GET_STUDENTS_BY_ID';
export const DATA_STUDENT_TO_UPDATE = 'DATA_STUDENT_TO_UPDATE';
export const ADD_STUDENT = 'ADD_STUDENT';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';

export const UPLOAD_SPINNER_ACTION = 'UPLOAD_SPINNER_ACTION';

const apiURL = 'http://localhost:8080/university';  // адрес сервера

export function getStudents() { // из этой функции возвращаем другую функцию, которая принимает функцию dispatch. Делается для того, чтобы можно было генерировать несколько действий в рамках одной функции
  return dispatch => {  // вызываем функцию до отправки запроса
    dispatch({
      type: REQUEST_STUDENTS
    });
    return axios.get(`${apiURL}/students/`)  // возвращаем результат вызова функции
        .then(function(response) {
          console.log('response.data', response.data);
          console.log('response.status', response.status);
          return response;
        })
        .then(response => response.data)    //  после получения ответа от сервера вызовем у объекта свойство data
        .then(students => dispatch({        //  объект вернем после получения ответа от сервера
          type: GET_STUDENTS,
          students
        }));
  };
}

export function getStudentsById(id) { // из этой функции возвращаем другую функцию, которая принимает функцию dispatch. Делается для того, чтобы можно было генерировать несколько действий в рамках одной функции
  return dispatch => {  // вызываем функцию до отправки запроса
    dispatch({
      type: REQUEST_STUDENTS_BY_ID
    });
    return axios.get(`${apiURL}/students/getByGroupId/${id}`)
    .then(function(response) {
      console.log('response.data', response.data);
      console.log('response.status', response.status);
      return response;
    })
        .then(response => response.data)
        .then(students => dispatch({
          type: GET_STUDENTS_BY_ID,
          students
        }));
  };
}

export const dataStudentToUpdate = (dataStudentToUpdate) => {
  return dispatch => {  // вызываем функцию до отправки запроса
    dispatch({
      type: DATA_STUDENT_TO_UPDATE,
      dataStudentToUpdate
    });
  };
};

export function addStudent({firstName, lastName}, groupId) {
  return dispatch => {
    dispatch({
      type: UPLOAD_SPINNER_ACTION
    });
    return axios.post(`${apiURL}/students?groupId=${groupId}`, {
      firstName,
      lastName
    }).then(function(response) {
      console.log('response.data', response.data);
      console.log('response.status', response.status);
      return response;
    }).then(function(response) {
      dispatch({
        type: UPLOAD_SPINNER_ACTION
      });
      return response;
    }).then(response => response.data).then(studentToAdd => ({   //  вернем объект действия
      type: ADD_STUDENT,
      studentToAdd   // передаем объект student
    }));
  };
}

export function deleteStudent(id) {
  return axios.delete(`${apiURL}/students/${id}`).then(response => ({    //  в ответ от сервера ничего не ожидаем, поэтому вернем объект действия
    type: DELETE_STUDENT,
    id    // параметр необходимен, чтобы знать, какой параметр удалить
  }));
}

export function updateStudent(id, {firstName, lastName}, groupId) {
  return dispatch => {
    dispatch({
      type: UPLOAD_SPINNER_ACTION
    });
    return axios.put(`${apiURL}/students/${id}?groupId=${groupId}`,
        {
          firstName,
          lastName
        }).then(function(response) {
      console.log('response.data', response.data);
      console.log('response.status', response.status);
      return response;
    }).then(function(response) {
      dispatch({
        type: UPLOAD_SPINNER_ACTION
      });
      return response;
    }).then(response => response.data).then(studentToUpdate => ({
      type: UPDATE_STUDENT,
      studentToUpdate
    }));
  };
}