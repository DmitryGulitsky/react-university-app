import {combineReducers} from 'redux';

import getStudentsReducer from './StudentsPage/getStudentsReducer';
import addStudentReducer from './StudentsPage/addStudentReducer';
import dataStudentToUpdateReducer
  from './StudentsPage/dataStudentToUpdateReducer';
import updateStudentReducer from './StudentsPage/updateStudentsReaducer';

import getGroupsReducer from './GroupsPage/getGroupsReducer';
import addGroupReducer from './GroupsPage/addGroupReducer';
import dataGroupToUpdateReducer from './GroupsPage/dataGroupToUpdateReducer';
import updateGroupReducer from './GroupsPage/updateGroupsReducer';

import getTeacherReducer from './TeachersPage/getTeachersReducer';
import addTeacherReducer from './TeachersPage/addTeacherReducer';
import dataTeacherToUpdateReducer
  from './TeachersPage/dataTeacherToUpdateReducer';
import updateTeachersReducer from './TeachersPage/updateTeachersReaducer';

import addStudentToGroupReducer from './GroupsPage/addStudentsToGroupReducer';
import addGroupsToTeacherReducer
  from './TeachersPage/addGroupsToTeacherReducer';

import getByIdReducer from './getByIdReducer';
import uploadSpinnerReducer from './uploadSpinnerReducer';

const reducer = combineReducers({
  students: getStudentsReducer,
  studentToAdd: addStudentReducer,
  dataStudentToUpdate: dataStudentToUpdateReducer,
  studentToUpdate: updateStudentReducer,
  groups: getGroupsReducer,
  groupToAdd: addGroupReducer,
  dataGroupToUpdate: dataGroupToUpdateReducer,
  groupToUpdate: updateGroupReducer,
  teachers: getTeacherReducer,
  teacherToAdd: addTeacherReducer,
  dataTeacherToUpdate: dataTeacherToUpdateReducer,
  teacherToUpdate: updateTeachersReducer,
  uploadedStudentToGroupFiles: addStudentToGroupReducer,
  uploadedGroupsToTeacherFiles: addGroupsToTeacherReducer,
  getById: getByIdReducer,
  loading: uploadSpinnerReducer
});

export default reducer;
