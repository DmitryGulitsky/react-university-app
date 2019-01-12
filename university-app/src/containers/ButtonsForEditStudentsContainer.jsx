// 3 функции компонентов-контейнеров:
// Подписка на обновления состояния в хранилище. Делаестя в componentDidMount, componentWillUnmount
// Сопоставляет действия презентационного компонента с действиями обновляющими состояния
//

import React from 'react';
import { connect } from 'react-redux';  // выполняет подписку-отписку

import { addStudent, deleteStudent, updateStudent } from "../actions/editStudentsTableAction";
import ButtonsForEditStudents from '../components/ButtonsForEditStudents';

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    editStudentsData: state.editStudentsData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddStudent: (idNumber, firstName, lastName) => {
      console.log('Add button clicked');
      dispatch(addStudent(idNumber, firstName, lastName))
    },
    onDeleteStudent: idNumber => {
      console.log('Delete button clicked');
      dispatch(deleteStudent(idNumber))
    },
    onUpdateStudent: (idNumber, firstName, lastName) => {
      console.log('Edit button clicked');
      dispatch(updateStudent(idNumber, firstName, lastName))
    }
  }
}

const ButtonsForEditStudentsContainer = connect(mapStateToProps, mapDispatchToProps)(ButtonsForEditStudents); // упрощенный синтаксис строк выше


export default ButtonsForEditStudentsContainer;