// import React from 'react';
import { connect } from 'react-redux';

import StudentsPage from '../components/pages/studentsPage/StudentsPage';

import { addStudent, deleteStudent, updateStudent } from "../actions/editStudentsTableAction";

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    students: state.students, // копируем в объект students
    loading: state.loading
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
      dispatch(updateStudent(id, firstName, lastName))
    }
  }
}

const StudentsPageContainer = connect(mapStateToProps, mapDispatchToProps)(StudentsPage); // упрощенный синтаксис строк выше


export default StudentsPageContainer;