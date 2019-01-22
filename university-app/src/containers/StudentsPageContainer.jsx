import {connect} from 'react-redux';

import StudentsPage from '../components/pages/studentsPage/StudentsPage';

import {addStudent, deleteStudent, updateStudent} from "../actions";

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    students: state.students, // копируем в объект students
    studentToAdd: state.studentToAdd,
    studentToUpdate: state.studentToUpdate,
    loading: state.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddStudent: (firstName, lastName, groupId) => {
      console.log('Add button clicked', firstName, lastName);
      dispatch(addStudent({firstName, lastName}, groupId))
    },
    onDeleteStudent: id => {
      console.log('Delete button clicked');
      dispatch(deleteStudent(id))
    },
    onUpdateStudent: (id, firstName, lastName, groupId) => {
      console.log('Edit button clicked', id, firstName, lastName);
      dispatch(updateStudent(id, {firstName, lastName}, groupId))
    }
  }
}

const StudentsPageContainer = connect(mapStateToProps, mapDispatchToProps)(StudentsPage);

export default StudentsPageContainer;