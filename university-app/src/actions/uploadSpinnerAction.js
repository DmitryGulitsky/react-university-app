import {UPLOAD_SPINNER_ACTION} from '../actions';

export default function reducer(state = {loading: false}, action) {
  switch (action.type) {

    case UPLOAD_SPINNER_ACTION:
      return {...state, loading: !state.loading};

    default:
      return state;
  }
}