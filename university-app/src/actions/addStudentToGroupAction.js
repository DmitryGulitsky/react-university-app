import axios from "axios/index";
import {UPLOAD_SPINNER_ACTION} from "./editStudentsAction";

export const ADD_STUDENT_TO_GROUP = 'ADD_STUDENT_TO_GROUP';

const apiURL = 'http://localhost:8080/university';  // адрес сервера

export function addStudentToGroup(uploadedStudentToGroupFiles) {
  return dispatch => {
    dispatch({
      type: UPLOAD_SPINNER_ACTION
    });
    return axios.post(`${apiURL}/students/upload`, {uploadedStudentToGroupFiles})
      .then(response => response.data)
      .then(function (response) {
        dispatch({
          type: UPLOAD_SPINNER_ACTION
        });
        return response;
      })
      .then(uploadedStudentToGroupFiles => ({   //  вернем объект действия
        type: ADD_STUDENT_TO_GROUP,
        uploadedStudentToGroupFiles   // передаем объект
      }))
  }
}