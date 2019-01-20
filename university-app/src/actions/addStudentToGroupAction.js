import axios from "axios/index";

export const ADD_STUDENT_TO_GROUP = 'ADD_STUDENT_TO_GROUP';

const apiURL = 'http://localhost:8080/university';  // адрес сервера

export function addStudentToGroup(uploadedStudentToGroupFiles) {
  return axios.post(`${apiURL}/students/upload`, {uploadedStudentToGroupFiles})
    .then(response => response.data)
    .then(uploadedStudentToGroupFiles => ({   //  вернем объект действия
      type: ADD_STUDENT_TO_GROUP,
      uploadedStudentToGroupFiles   // передаем объект
    }))
}