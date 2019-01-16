// import React from 'react';
import { connect } from 'react-redux';

import GroupsPage from '../components/pages/groupsPage/GroupsPage';


import { addGroup, deleteGroup, updateGroup } from "../actions/editGroupsTableAction";

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    groups: state.groups,
    loading: state.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddGroup: (firstName, lastName) => {
      console.log('Add button clicked');
      dispatch(addGroup(firstName, lastName))
    },
    onDeleteGroup: id => {
      console.log('Delete button clicked');
      dispatch(deleteGroup(id))
    },
    onUpdateGroup: (id, firstName, lastName) => {
      console.log('Edit button clicked');
      dispatch(updateGroup(id, firstName, lastName))
    }
  }
}

const GroupsPageContainer = connect(mapStateToProps, mapDispatchToProps)(GroupsPage); // упрощенный синтаксис строк выше

export default GroupsPageContainer;