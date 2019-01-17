import { connect } from 'react-redux';

import GroupsPage from '../components/pages/groupsPage/GroupsPage';


import { addGroup, deleteGroup, updateGroup } from "../actions";

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    groups: state.groups,
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
    onUpdateGroup: (id, number, teacher) => {
      console.log('Edit button clicked');
      dispatch(updateGroup(id, number, teacher))
    }
  }
}

const GroupsPageContainer = connect(mapStateToProps, mapDispatchToProps)(GroupsPage); // упрощенный синтаксис строк выше

export default GroupsPageContainer;