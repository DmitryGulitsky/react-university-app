import axios from 'axios/index';
import {SHOW_LOADER, HIDE_LOADER} from './loaderAction';
import {SHOW_POPUP} from './uploadPopupAction';
import {GET_UPLOAD_STATUS} from './getUploadStatusAction';

export const ADD_GROUPS_TO_TEACHER = 'ADD_GROUPS_TO_TEACHER';

const apiURL = 'http://localhost:8080/university';  // адрес сервера

export function addGroupsToTeacher(uploadedGroupsToTeacherFiles) {
  return dispatch => {
    dispatch({
      type: SHOW_LOADER
    });
    return axios.post(`${apiURL}/groups/upload`,
        {uploadedGroupsToTeacherFiles})
    .then((response) => {
      const uploadStatus = response.status;
      dispatch({
        type: GET_UPLOAD_STATUS,
        uploadStatus
      });
      console.log('response.status', response.status);
      return response;
    })
    .then(response => response.data)
    .then(uploadedGroupsToTeacherFiles => ({
          type: ADD_GROUPS_TO_TEACHER,
          uploadedGroupsToTeacherFiles
        }))
    .then(() => {
      dispatch({
        type: HIDE_LOADER
      })
    })
    .then(() => {
      dispatch({
        type: SHOW_POPUP
      });
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
      return error.response.status;
    })
    .then((uploadStatus) => {
      console.log('UPLOAD STATUS', uploadStatus);
      dispatch({
        type: GET_UPLOAD_STATUS,
        uploadStatus
      });
    })
    .then((response) => {
      dispatch({
        type: HIDE_LOADER
      });
    })
    .then((response) => {
      dispatch({
        type: SHOW_POPUP
      });
    })
  };
}