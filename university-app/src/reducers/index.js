import { combineReducers } from 'redux';

import { default as changeId } from './changeIdReducer';
import { default as changeTable } from './changeTableReducer';
import { default as editGroupsTable } from './editGroupsTableReducer';
import { default as editStudentsTable } from './editStudentsTableReducer';
import { default as editTeachersTable } from './editTeachersTableReducer';
import loading from './loading'

const reducer = combineReducers({
  idNumber: changeId,
  getDataUrl: changeTable,
  editStudentsData: editStudentsTable,
  editGroupsData: editGroupsTable,
  editTeachersData: editTeachersTable,
  loading
});

export default reducer;
