import {connect} from 'react-redux';
import AddStudentForm from '../../components/pages/studentsPage/AddStudentForm';
import {addStudent} from '../../actions/index';

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    groups: state.groups,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAddStudent: (firstName, lastName, groupId) => {
      dispatch(addStudent({firstName, lastName}, groupId));
    }
  };
}

const AddStudentFormContainer = connect(mapStateToProps, mapDispatchToProps)(
    AddStudentForm);

export default AddStudentFormContainer;