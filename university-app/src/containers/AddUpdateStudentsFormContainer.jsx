import {connect} from 'react-redux';
import AddUpdateStudentsForm from '../components/pages/studentsPage/AddUpdateStudentsForm';
import {addStudent, updateStudent} from '../actions/index';

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    groups: state.groups,
    dataStudentToUpdate: state.dataStudentToUpdate,
    studentToUpdate: state.studentToUpdate,
    formType: state.formType
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAddStudent: (firstName, lastName, groupId) => {
      dispatch(addStudent({firstName, lastName}, groupId));
    },
    onUpdateStudent: (id, firstName, lastName, groupId) => {
      dispatch(updateStudent(id, {firstName, lastName}, groupId));
    }
  };
}

const AddUpdateStudentsFormContainer = connect(mapStateToProps, mapDispatchToProps)(
    AddUpdateStudentsForm);

export default AddUpdateStudentsFormContainer;