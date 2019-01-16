// 3 функции компонентов-контейнеров:
// Подписка на обновления состояния в хранилище. Делаестя в componentDidMount, componentWillUnmount
// Сопоставляет действия презентационного компонента с действиями обновляющими состояния
//

import React from 'react';
import { connect } from 'react-redux';  // выполняет подписку-отписку

import ButtonsForEditGroups from '../components/pages/buttonsForEdit/ButtonsForEditStudents';
import {addGroup, deleteGroup, updateGroup} from "../actions";

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    editStudentsData: state.editStudentsData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddGroup: (number, teacher) => {
      console.log('Add button clicked');
      dispatch(addGroup(number, teacher))
    },
    onDeleteGroup: id => {
      console.log('Delete button clicked');
      dispatch(deleteGroup(id))
    },
    onUpdateGroup: (number, teacher) => {
      console.log('Edit button clicked');
      dispatch(updateGroup(number, teacher))
    }
  }
}

const ButtonsForEditGroupsContainer = connect(mapStateToProps, mapDispatchToProps)(ButtonsForEditGroups); // упрощенный синтаксис строк выше

export default ButtonsForEditGroupsContainer;