import {ADD_GROUP, UPDATE_GROUP, DELETE_GROUP} from "../actions/editGroupsTableAction";

export default function reducer(state = {
  "id": "",
  "urlPage": "",
  "groupId": "",
  "number": "",
  "teacher": ""
}, action) {  //  указываем начальное состояние
  switch (action.type) {
    case ADD_GROUP:
      return {
        id: action.id,
        urlPage: action.urlPage,
        groupId: action.groupId,
        number: action.number,
        teacher: action.teacher
      };

    case UPDATE_GROUP:
      return {
        id: action.id,
        urlPage: action.urlPage,
        groupId: action.groupId,
        number: action.number,
        teacher: action.teacher
      };

    case DELETE_GROUP:
      return {
        id: action.id,
        urlPage: action.urlPage,
        groupId: action.groupId,
      };

    default:
      return state;
  }
}