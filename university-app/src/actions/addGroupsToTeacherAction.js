import axios from "axios/index";

export const ADD_GROUPS_TO_TEACHER = 'ADD_GROUPS_TO_TEACHER';

const apiURL = 'http://localhost:8080/university';  // адрес сервера

export function addGroupsToTeacher(uploadedGroupsToTeacherFiles) {
  return axios.post(`${apiURL}/groups/upload`, {uploadedGroupsToTeacherFiles})
    .then(response => response.data)
    .then(uploadedGroupsToTeacherFiles => ({
      type: ADD_GROUPS_TO_TEACHER,
      uploadedGroupsToTeacherFiles
    }))
}