import {ADD_GROUP} from '../../actions/index';

export default function reducer(state = [], action) {
  switch (action.type) {

    case ADD_GROUP:
      return action.groupToAdd;

    default:
      return state;
  }
}