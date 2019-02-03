import {connect} from 'react-redux';
import StudentsPage from '../../components/pages/studentsPage/StudentsPage';
import {dataToUpdate, deleteStudent} from '../../actions/index';

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    students: state.students,
    groups: state.groups,
    dataToUpdate: state.dataToUpdate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dataToUpdate: (data) => {
      dispatch(dataToUpdate(data));
    },
    onDeleteStudent: id => {
      dispatch(deleteStudent(id));
    }
  };
}

const StudentsPageContainer = connect(mapStateToProps, mapDispatchToProps)(
    StudentsPage);
export default StudentsPageContainer;