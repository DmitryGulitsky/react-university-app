import {SHOW_POPUP, HIDE_POPUP} from '../actions';

export default function reducer(state = false, action) {
  switch (action.type) {

    case SHOW_POPUP:
      return true;

    case HIDE_POPUP:
      return false;

    default:
      return state;
  }
}