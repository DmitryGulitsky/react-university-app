import {connect} from 'react-redux';
import GroupsPage from '../../components/pages/groupsPage/GroupsPage';
import {dataGroupToUpdate, deleteGroup} from '../../actions/index';

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    groups: state.groups,
    dataGroupToUpdate: state.dataGroupToUpdate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dataGroupToUpdate: (data) => {
      dispatch(dataGroupToUpdate(data));
    },
    onDeleteGroup: id => {
      console.log('Delete button clicked');
      dispatch(deleteGroup(id));
    }
  };
}

const GroupsPageContainer = connect(mapStateToProps, mapDispatchToProps)(
    GroupsPage); // упрощенный синтаксис строк выше

export default GroupsPageContainer;