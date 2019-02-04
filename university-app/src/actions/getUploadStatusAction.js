export const GET_UPLOAD_STATUS = 'GET_UPLOAD_STATUS';

export  function getUploadStatus(uploadStatus) {
  return dispatch => {
    dispatch({
      type: GET_UPLOAD_STATUS,
      uploadStatus
    });
  };
}