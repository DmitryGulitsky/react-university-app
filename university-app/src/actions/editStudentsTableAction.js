import axios from 'axios';

export const REQUEST_STUDENTS = 'REQUEST_STUDENTS';
export const GET_STUDENTS = 'GET_STUDENT';
export const ADD_STUDENT = 'ADD_STUDENT';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';

const apiURL = 'http://localhost:8080/university';  // адрес сервера

export function getStudents() { // из этой функции возвращаем другую функцию, которая принимает функцию dispatch. Делается для того, чтобы можно было генерировать несколько действий в рамках одной функции
  return dispatch => {  // вызываем функцию до отправки запроса
    dispatch({
      type: REQUEST_STUDENTS
    });
    return axios.get(`${apiURL}/students/`)  // возвращаем результат вызова функции
      .then(response => response.data)    //  после получения ответа от сервера вызовем у объекта свойство data
      .then(students => dispatch({        //  объект вернем после получения ответа от сервера
        type: GET_STUDENTS,
        students
      }))
      .catch(function (error) {
        console.log('Get students error', error);
      });
  };
}

//
//export const requestStudents = (students) => {
//  return {
//    type: REQUEST_STUDENTS,
//    students
//  }
//};
//
//export const getStudents = () => {
//  return (dispatch) => {
//    return axios.get('http://localhost:8080/university/students/')
//      .then(response => {
//        dispatch(requestStudents(response.data))
//      })
//      .catch(error => {
//        throw(error);
//      });
//  };
//};


export function addStudent(firstName, lastName) {
  return axios.post(`${apiURL}/students/`, {firstName, lastName})
    .then(response => response.data)
    .then(student => ({   //  вернем объект действия
      type: ADD_STUDENT,
      student   // передаем объект student
    }))
    .catch(function (error) {
      console.log('Add student error', error);
    });
}

export function deleteStudent(id) {
  return axios.delete(`${apiURL}/students/${id}`)
    .then(response => ({    //  в ответ от сервера ничего не ожидаем, поэтому вернем объект действия
      type: DELETE_STUDENT,
      id    // параметр необходимен, чтобы знать, какой параметр удалить
    }))
    .catch(function (error) {
      console.log('Delete student error', error);
    });
}

export function updateStudent(id, {firstName, lastName}) {
  return axios.put(`${apiURL}/students/${id}`, {firstName, lastName})
    .then(response => response.data)
    .then(student => ({
      type: UPDATE_STUDENT,
      student
    }))
    .catch(function (error) {
      console.log('Update student error', error);
    });
}