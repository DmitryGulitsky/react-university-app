import { connect } from 'react-redux';

import TeachersPage from '../components/pages/teachersPage/TeachersPage';

import { addTeacher, deleteTeacher, updateTeacher } from "../actions/";

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    teachers: state.teachers,
    teacherToAdd: state.teacherToAdd,
    teacherToUpdate: state.teacherToUpdate,
    loading: state.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddTeacher: (firstName, lastName) => {
      console.log('Add button clicked');
      dispatch(addTeacher({firstName, lastName}))
    },
    onDeleteTeacher: id => {
      console.log('Delete button clicked');
      dispatch(deleteTeacher(id))
    },
    onUpdateTeacher: (id, firstName, lastName) => {
      console.log('Edit button clicked');
      dispatch(updateTeacher(id, {firstName, lastName}))
    }
  }
}

const TeachersPageContainer = connect(mapStateToProps, mapDispatchToProps)(TeachersPage); // упрощенный синтаксис строк выше

export default TeachersPageContainer;