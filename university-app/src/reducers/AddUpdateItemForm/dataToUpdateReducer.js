import {DATA_TO_UPDATE} from '../../actions/index';

export default function reducer(state = {}, action) {
  switch (action.type) {

    case DATA_TO_UPDATE:
      return action.dataToUpdate;

    default:
      return state;
  }
}