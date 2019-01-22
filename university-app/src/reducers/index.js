import {combineReducers} from 'redux';

import getStudentsReducer from './getStudentsReducer';
import addStudentReducer from './addStudentReducer';
import updateStudentReducer from './updateStudentsReaducer';
import getGroupsReducer from './getGroupsReducer';
import addGroupReducer from './addGroupReducer';
import updateGroupReducer from './updateGroupsReducer';
import getTeacherReducer from './getTeachersReducer';
import addTeacherReducer from './addTeacherReducer';
import updateTeachersReducer from './updateTeachersReaducer';
import addStudentToGroupReducer from './addStudentToGroupReducer';
import addGroupsToTeacherReducer from './addGroupsToTeacherReducer';
import getByIdReducer from './getByIdReducer';
import uploadSpinnerReducer from './uploadSpinnerReducer';

const reducer = combineReducers({
  students: getStudentsReducer,
  studentToAdd:  addStudentReducer,
  studentToUpdate: updateStudentReducer,
  groups: getGroupsReducer,
  groupToAdd:  addGroupReducer,
  groupToUpdate: updateGroupReducer,
  teachers: getTeacherReducer,
  teacherToAdd:  addTeacherReducer,
  teacherToUpdate: updateTeachersReducer,
  uploadedStudentToGroupFiles: addStudentToGroupReducer,
  uploadedGroupsToTeacherFiles: addGroupsToTeacherReducer,
  getById: getByIdReducer,
  loading: uploadSpinnerReducer
});

export default reducer;