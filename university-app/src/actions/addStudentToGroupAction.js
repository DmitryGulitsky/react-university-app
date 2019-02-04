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
    return axios.post(`${apiURL}/students/upload`,
      {uploadedStudentToGroupFiles})
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