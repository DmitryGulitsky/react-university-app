import {connect} from 'react-redux';

import StudentsPage from '../components/pages/studentsPage/StudentsPage';

import {addStudent, deleteStudent, updateStudent} from "../actions";

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    students: state.students, // копируем в объект students
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddStudent: (firstName, lastName) => {
      console.log('Add button clicked');
      dispatch(addStudent(firstName, lastName))
    },
    onDeleteStudent: id => {
      console.log('Delete button clicked');
      dispatch(deleteStudent(id))
    },
    onUpdateStudent: (id, firstName, lastName) => {
      console.log('Edit button clicked');
      dispatch(updateStudent( firstName, lastName))
    }
  }
}

const StudentsPageContainer = connect(mapStateToProps, mapDispatchToProps)(StudentsPage);


export default StudentsPageContainer;