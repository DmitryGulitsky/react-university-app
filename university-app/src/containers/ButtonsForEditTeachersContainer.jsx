// 3 функции компонентов-контейнеров:
// Подписка на обновления состояния в хранилище. Делаестя в componentDidMount, componentWillUnmount
// Сопоставляет действия презентационного компонента с действиями обновляющими состояния

import React from 'react';
import { connect } from 'react-redux';  // выполняет подписку-отписку

import { addTeacher, deleteTeacher, updateTeacher } from "../actions/editTeachersTableAction";
import ButtonsForEditTeachers from '../components/pages/buttonsForEdit/ButtonsForEditTeachers';

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    editStudentsData: state.editStudentsData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddTeacher: (firstName, lastName) => {
      console.log('Add button clicked');
      dispatch(addTeacher(firstName, lastName))
    },
    onDeleteTeacher: id => {
      console.log('Delete button clicked');
      dispatch(deleteTeacher(id))
    },
    onUpdateTeacher: (firstName, lastName) => {
      console.log('Edit button clicked');
      dispatch(updateTeacher(firstName, lastName))
    }
  }
}

const ButtonsForEditTeachersContainer = connect(mapStateToProps, mapDispatchToProps)(ButtonsForEditTeachers); // упрощенный синтаксис строк выше

export default ButtonsForEditTeachersContainer;