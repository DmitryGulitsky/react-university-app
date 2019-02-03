import {combineReducers} from 'redux';

import getStudentsReducer from './StudentsPage/getStudentsReducer';
import addStudentReducer from './StudentsPage/addStudentReducer';
import dataToUpdateReducer
  from './AddUpdateItemForm/dataToUpdateReducer';
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

import changeFormTypeReducer from './AddUpdateItemForm/changeFormTypeReducer';

import loaderReducer from './loaderReducer';

const reducer = combineReducers({
  students: getStudentsReducer,
  studentToAdd: addStudentReducer,
  dataToUpdate: dataToUpdateReducer,
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
  formType: changeFormTypeReducer,
  loading: loaderReducer
});

export default reducer;
