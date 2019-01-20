import {combineReducers} from 'redux';

import getStudentsReducer from './getStudentsReducer';
import addStudentsReducer from './addStudentsReducer';
import updateStudentsReducer from './updateStudentsReaducer';
import getGroupsReducer from './getGroupsReducer';
import addGroupsReducer from './addGroupsReducer';
import updateGroupsReducer from './updateGroupsReducer';
import getTeachersReducer from './getTeachersReducer';
import addTeachersReducer from './addTeachersReducer';
import updateTeachersReducer from './updateTeachersReaducer';
import addStudentToGroupReducer from './addStudentToGroupReducer';
import addGroupsToTeacherReducer from './addGroupsToTeacherReducer';
import getByIdReducer from './getByIdReducer';
import uploadSpinnerReducer from './uploadSpinnerReducer';

const reducer = combineReducers({
  students: getStudentsReducer,
  studentsToAdd:  addStudentsReducer,
  studentsToUpdate: updateStudentsReducer,
  groups: getGroupsReducer,
  groupsToAdd:  addGroupsReducer,
  groupsToUpdate: updateGroupsReducer,
  teachers: getTeachersReducer,
  teachersToAdd:  addTeachersReducer,
  teachersToUpdate: updateTeachersReducer,
  uploadedStudentToGroupFiles: addStudentToGroupReducer,
  uploadedGroupsToTeacherFiles: addGroupsToTeacherReducer,
  getById: getByIdReducer,
  loading: uploadSpinnerReducer
});

export default reducer;