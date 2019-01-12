import {GROUPS_PAGE, MAIN_PAGE, STUDENTS_PAGE, TEACHERS_PAGE} from "../actions/changeTableAction";

export default function reducer (state = { urlPage: "http://localhost:8080/university/students" }, action) {  //  указываем начальное состояние
  switch (action.type) {
    case MAIN_PAGE:
      return { urlPage: action.urlPage };

    case STUDENTS_PAGE:
      return { urlPage: action.urlPage };

    case GROUPS_PAGE:
      return { urlPage: action.urlPage };

    case TEACHERS_PAGE:
      return { urlPage: action.urlPage };

    default:
      return state;
  }
}
