import { connect } from 'react-redux';

import TeachersPage from '../components/pages/teachersPage/TeachersPage';

import { addTeacher, deleteTeacher, updateTeacher } from "../actions/";

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    teachers: state.teachers,
    teachersToAdd: state.teachersToAdd,
    teachersToUpdate: state.teachersToUpdate,
    loading: state.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddTeacher: (teachersToAdd) => {
      console.log('Add button clicked');
      dispatch(addTeacher(teachersToAdd))
    },
    onDeleteTeacher: id => {
      console.log('Delete button clicked');
      dispatch(deleteTeacher(id))
    },
    onUpdateTeacher: (id, teachersToUpdate) => {
      console.log('Edit button clicked');
      dispatch(updateTeacher(id, teachersToUpdate))
    }
  }
}

const TeachersPageContainer = connect(mapStateToProps, mapDispatchToProps)(TeachersPage); // упрощенный синтаксис строк выше

export default TeachersPageContainer;