import {connect} from 'react-redux';
import StudentsPage from '../../components/pages/studentsPage/StudentsPage';
import { dataStudentToUpdate, deleteStudent } from '../../actions/index';

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    students: state.students,
    dataStudentToUpdate: state.dataStudentToUpdate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dataStudentToUpdate: (data) => {
      dispatch(dataStudentToUpdate(data));
    },
    onDeleteStudent: id => {
      dispatch(deleteStudent(id));
    }
  };
}

const StudentsPageContainer = connect(mapStateToProps, mapDispatchToProps)(
    StudentsPage);

export default StudentsPageContainer;