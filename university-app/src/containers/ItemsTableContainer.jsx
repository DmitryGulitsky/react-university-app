import {connect} from 'react-redux';
import ItemsTable from '../components/pages/ItemsTable';
import {
  dataToUpdate,
  deleteStudent,
  deleteGroup,
  deleteTeacher
} from '../actions/index';

function mapStateToProps(state) {
  return {
    page: state.page,
    students: state.students,
    groups: state.groups,
    teachers: state.teachers,
    dataToUpdate: state.dataToUpdate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dataToUpdate: (data) => {
      dispatch(dataToUpdate(data));
    },
    onDeleteStudent: id => {
      dispatch(deleteStudent(id));
    },
    onDeleteGroup: id => {
      dispatch(deleteGroup(id));
    },
    onDeleteTeacher: id => {
      dispatch(deleteTeacher(id))
    }
  };
}

const ItemsTableContainer = connect(mapStateToProps, mapDispatchToProps)(
    ItemsTable);
export default ItemsTableContainer;