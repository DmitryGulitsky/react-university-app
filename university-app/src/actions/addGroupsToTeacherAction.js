import axios from 'axios/index';
import {SHOW_LOADER, HIDE_LOADER} from './loaderAction';

export const ADD_GROUPS_TO_TEACHER = 'ADD_GROUPS_TO_TEACHER';

const apiURL = 'http://localhost:8080/university';  // адрес сервера

export function addGroupsToTeacher(uploadedGroupsToTeacherFiles) {
  return dispatch => {
    dispatch({
      type: SHOW_LOADER
    });
    return axios.post(`${apiURL}/groups/upload`,
        {uploadedGroupsToTeacherFiles})
    .then(response => response.data)
    .then(uploadedGroupsToTeacherFiles => ({
          type: ADD_GROUPS_TO_TEACHER,
          uploadedGroupsToTeacherFiles
        }))
    .then(() => {
          dispatch({
            type: HIDE_LOADER
          });
        });
  };
}