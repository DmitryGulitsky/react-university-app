import { connect } from 'react-redux';

import UpdateTeacherForm from '../../components/pages/teachersPage/UpdateTeacherForm';

import { updateTeacher } from "../../actions/index";

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    dataTeacherToUpdate: state.dataTeacherToUpdate,
    teacherToUpdate: state.teacherToUpdate,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateTeacher: (id, firstName, lastName) => {
      dispatch(updateTeacher(id, {firstName, lastName}))
    }
  }
}

const UpdateTeacherFormContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateTeacherForm);

export default UpdateTeacherFormContainer;