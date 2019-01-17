import {combineReducers} from 'redux';

import editGroupsTable from './editGroupsTableReducer';
import editStudentsTable from './editStudentsTableReducer';
import editTeachersTable from './editTeachersTableReducer';

const reducer = combineReducers({
  students: editStudentsTable,
  groups: editGroupsTable,
  teachers: editTeachersTable,
});

export default reducer;
