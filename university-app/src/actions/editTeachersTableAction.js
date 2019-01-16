import axios from 'axios';

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

export function addTeacher(firstName, lastName) {
  return axios.post('http://localhost:8080/university/teachers/', {firstName, lastName})
    .then(response => response.data)
    .then(teacher => ({
      type: ADD_TEACHER,
      teacher
    }));
}

export function deleteTeacher(id) {
  return axios.delete(`http://localhost:8080/university/teachers/${id}`)
    .then(response => ({
      type: DELETE_TEACHER,
      id
    }));
}

export function updateTeacher(id, { firstName, lastName }) {
  return axios.put(`http://localhost:8080/university/teachers/${id}`, { firstName, lastName })
    .then(response => response.data)
    .then(teacher => ({
      type: UPDATE_TEACHER,
      teacher
    }));
}


// import axios from 'axios';
//
// export const REQUEST_TODOS = 'REQUEST_TODOS';
// export const GET_TODOS = 'GET_TODOS';
// export const ADD_TODO = 'ADD_TODO';
// export const DELETE_TODO = 'DELETE_TODO';
// export const TOGGLE_TODO = 'TOGGLE_TODO';
// export const EDIT_TODO = 'EDIT_TODO';

// export function getTeachers() {
//   return dispatch => {
//     dispatch({
//       type: REQUEST_TEACHERS
//     });
//     return axios.get('api/todos')
//       .then(response => response.data)
//       .then(todos => dispatch({
//         type: GET_TEACHERS,
//         todos
//       }));
//   };
// }

// export function addTodo(title) {
//   return axios.post('api/todos', { title })
//     .then(response => response.data)
//     .then(todo => ({
//       type: ADD_TODO,
//       todo
//
//     }));
// }

// export function deleteTodo(id) {
//   return axios.delete(`api/todos/${id}`)
//     .then(response => ({
//       type: DELETE_TODO,
//       id
//     }));
// }

// export function editTodo(id, { title }) {
//   return axios.put(`api/todos/${id}`)
//     .then(response => response.data)
//     .then(todo => ({
//       type: EDIT_TODO,
//       todo
//     }));
// }