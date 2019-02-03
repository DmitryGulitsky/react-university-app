import { connect } from 'react-redux';
import TeachersPage from '../../components/pages/teachersPage/TeachersPage';
import { dataToUpdate, deleteTeacher } from "../../actions/index";

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    teachers: state.teachers,
    groups: state.groups,
    dataToUpdate: state.dataToUpdate,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dataToUpdate: (data) => {
      dispatch(dataToUpdate(data))
    },
    onDeleteTeacher: id => {
      dispatch(deleteTeacher(id))
    }
  }
}

const TeachersPageContainer = connect(mapStateToProps, mapDispatchToProps)(TeachersPage); // упрощенный синтаксис строк выше
export default TeachersPageContainer;