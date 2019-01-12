import {CHANGE_ID} from "../actions/changeIdAction";

export default function reducer (state = { idNumber: 0 }, action) {  //  указываем начальное состояние
  switch (action.type) {

    case CHANGE_ID:
      return { idNumber: action.idNumber };

    default:
      return state;
  }
}
