import { combineReducers } from 'redux';

import editGroupsTable from './editGroupsTableReducer';
import editStudentsTable from './editStudentsTableReducer';
import editTeachersTable from './editTeachersTableReducer';
import loading from './loading'

const reducer = combineReducers({
  students: editStudentsTable,
  groups: editGroupsTable,
  teachers: editTeachersTable,
  loading
});

export default reducer;
