import { connect } from 'react-redux';

import GroupsPage from '../components/pages/groupsPage/GroupsPage';


import { addGroup, deleteGroup, updateGroup } from "../actions";

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    groups: state.groups,
    groupsToAdd: state.groupsToAdd,
    groupsToUpdate: state.groupsToUpdate,
    loading: state.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddGroup: (groupsToAdd) => {
      console.log('Add button clicked');
      dispatch(addGroup(groupsToAdd))
    },
    onDeleteGroup: id => {
      console.log('Delete button clicked');
      dispatch(deleteGroup(id))
    },
    onUpdateGroup: (id, groupsToUpdate) => {
      console.log('Edit button clicked');
      dispatch(updateGroup(id, groupsToUpdate))
    }
  }
}

const GroupsPageContainer = connect(mapStateToProps, mapDispatchToProps)(GroupsPage); // упрощенный синтаксис строк выше

export default GroupsPageContainer;