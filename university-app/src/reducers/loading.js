import { REQUEST_PAGE } from '../actions';

function reducer(state = false, action) {
  switch (action.type) {
    case REQUEST_PAGE:
      return true;

    default:
      return state;
  }
}

export default reducer;