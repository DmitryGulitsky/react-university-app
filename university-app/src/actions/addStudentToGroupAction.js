import axios from 'axios/index';
import {SHOW_LOADER, HIDE_LOADER} from './loaderAction';
import {SHOW_POPUP} from './uploadPopupAction';
import {GET_UPLOAD_STATUS} from './getUploadStatusAction';

export const ADD_STUDENT_TO_GROUP = 'ADD_STUDENT_TO_GROUP';

const apiURL = 'http://localhost:8080/university';

export function addStudentToGroup(uploadedStudentToGroupFiles) {
  return dispatch => {
    dispatch({
      type: SHOW_LOADER
    });
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    //let fd = new FormData();
    //fd.append('file',files[0]);
    return axios.post(`${apiURL}/students/upload`,
      {uploadedStudentToGroupFiles}, config)
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
      .then(uploadedStudentToGroupFiles => ({
        type: ADD_STUDENT_TO_GROUP,
        uploadedStudentToGroupFiles
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
        console.log(error.response);
        console.log(error.message);
        console.log(error.description);
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
      return error.message;
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