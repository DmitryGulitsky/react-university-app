import {GET_UPLOAD_STATUS} from '../actions/index';

export default function reducer(state = {}, action) {
  switch (action.type) {

    case GET_UPLOAD_STATUS:
      return action.uploadStatus;

    default:
      return state;
  }
}