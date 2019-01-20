import {connect} from 'react-redux';

import StudentsPage from '../components/pages/studentsPage/StudentsPage';

import {addStudent, deleteStudent, updateStudent} from "../actions";

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    students: state.students, // копируем в объект students
    studentsToAdd: state.studentsToAdd,
    studentsToUpdate: state.studentsToUpdate,
    loading: state.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddStudent: (studentsToAdd) => {
      console.log('Add button clicked');
      dispatch(addStudent(studentsToAdd))
    },
    onDeleteStudent: id => {
      console.log('Delete button clicked');
      dispatch(deleteStudent(id))
    },
    onUpdateStudent: (id, studentsToUpdate) => {
      console.log('Edit button clicked');
      dispatch(updateStudent(id, studentsToUpdate))
    }
  }
}

const StudentsPageContainer = connect(mapStateToProps, mapDispatchToProps)(StudentsPage);

export default StudentsPageContainer;