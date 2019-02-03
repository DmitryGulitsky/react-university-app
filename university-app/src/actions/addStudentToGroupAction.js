import axios from 'axios/index';
import {SHOW_LOADER, HIDE_LOADER} from './loaderAction';
import {SHOW_POPUP} from './uploadPopupAction';

export const ADD_STUDENT_TO_GROUP = 'ADD_STUDENT_TO_GROUP';

const apiURL = 'http://localhost:8080/university';  // адрес сервера

export function addStudentToGroup(uploadedStudentToGroupFiles) {
  return dispatch => {
    dispatch({
      type: SHOW_LOADER
    });
    return axios.post(`${apiURL}/students/upload`,
      {uploadedStudentToGroupFiles})
      .then(response => response.data)
      .then(uploadedStudentToGroupFiles => ({   //  вернем объект действия
        type: ADD_STUDENT_TO_GROUP,
        uploadedStudentToGroupFiles   // передаем объект
      }))
      .then(() => {
        dispatch({
          type: HIDE_LOADER
        });
        dispatch({
          type: SHOW_POPUP
        });
      });
  };
}