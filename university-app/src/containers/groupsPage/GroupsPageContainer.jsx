import {connect} from 'react-redux';
import GroupsPage from '../../components/pages/groupsPage/GroupsPage';
import {dataToUpdate, deleteGroup} from '../../actions/index';

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
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
    onDeleteGroup: id => {
      dispatch(deleteGroup(id));
    }
  };
}

const GroupsPageContainer = connect(mapStateToProps, mapDispatchToProps)(
    GroupsPage);

export default GroupsPageContainer;