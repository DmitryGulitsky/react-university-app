import { connect } from 'react-redux';
import UpdateStudentForm from '../../components/pages/studentsPage/UpdateStudentForm';
import { updateStudent } from '../../actions/index';

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    dataStudentToUpdate: state.dataStudentToUpdate,
    studentToUpdate: state.studentToUpdate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateStudent: (id, firstName, lastName, groupId) => {
      dispatch(updateStudent(id, {firstName, lastName}, groupId));
    }
  };
}

const UpdateStudentFormContainer = connect(mapStateToProps, mapDispatchToProps)(
    UpdateStudentForm);

export default UpdateStudentFormContainer;