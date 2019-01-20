import axios from 'axios';

export const REQUEST_STUDENTS = 'REQUEST_STUDENTS';
export const GET_STUDENTS = 'GET_STUDENT';
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
      .then(function (response) {
        console.log('response.data', response.data);
        console.log('response.status', response.status);
        console.log('response.statusText', response.statusText);
        console.log('response.headers', response.headers);
        console.log('response.config', response.config);
        return response;
      })
      .then(response => response.data)    //  после получения ответа от сервера вызовем у объекта свойство data
      .then(students => dispatch({        //  объект вернем после получения ответа от сервера
        type: GET_STUDENTS,
        students
      }))
  };
}

export function addStudent(studentsToAdd) {
  return dispatch => {
    dispatch({
      type: UPLOAD_SPINNER_ACTION
    });
    return axios.post(`${apiURL}/students/`, {studentsToAdd})
      .then(student => ({   //  вернем объект действия
        type: ADD_STUDENT,
        student   // передаем объект student
      }))
      .then(dispatch({
          type: UPLOAD_SPINNER_ACTION
        })
      );

  }
}

export function deleteStudent(id) {
  return axios.delete(`${apiURL}/students/${id}`)
    .then(response => ({    //  в ответ от сервера ничего не ожидаем, поэтому вернем объект действия
      type: DELETE_STUDENT,
      id    // параметр необходимен, чтобы знать, какой параметр удалить
    }))
}

export function updateStudent(id, {studentsToUpdate}) {
  return dispatch => {
    dispatch({
      type: UPLOAD_SPINNER_ACTION
    });
    return axios.put(`${apiURL}/students/${id}`, {studentsToUpdate})
      .then(response => response.data)
      .then(student => ({
        type: UPDATE_STUDENT,
        student
      }))
      .then(dispatch({
          type: UPLOAD_SPINNER_ACTION
        })
      );
  }
}