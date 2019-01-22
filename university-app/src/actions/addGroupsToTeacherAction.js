import axios from "axios/index";
import {UPLOAD_SPINNER_ACTION} from "./editStudentsAction";

export const ADD_GROUPS_TO_TEACHER = 'ADD_GROUPS_TO_TEACHER';

const apiURL = 'http://localhost:8080/university';  // адрес сервера

export function addGroupsToTeacher(uploadedGroupsToTeacherFiles) {
  return dispatch => {
    dispatch({
      type: UPLOAD_SPINNER_ACTION
    });
    return axios.post(`${apiURL}/groups/upload`, {uploadedGroupsToTeacherFiles})
      .then(response => response.data)
      .then(function (response) {
        dispatch({
          type: UPLOAD_SPINNER_ACTION
        });
        return response;
      })
      .then(uploadedGroupsToTeacherFiles => ({
        type: ADD_GROUPS_TO_TEACHER,
        uploadedGroupsToTeacherFiles
      }))
  }
}