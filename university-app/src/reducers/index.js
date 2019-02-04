import {combineReducers} from 'redux';

import getStudentsReducer from './StudentsPage/getStudentsReducer';
import addStudentReducer from './StudentsPage/addStudentReducer';
import updateStudentReducer from './StudentsPage/updateStudentsReaducer';

import getGroupsReducer from './GroupsPage/getGroupsReducer';
import addGroupReducer from './GroupsPage/addGroupReducer';
import updateGroupReducer from './GroupsPage/updateGroupsReducer';

import getTeacherReducer from './TeachersPage/getTeachersReducer';
import addTeacherReducer from './TeachersPage/addTeacherReducer';
import updateTeachersReducer from './TeachersPage/updateTeachersReaducer';

import addStudentToGroupReducer from './GroupsPage/addStudentsToGroupReducer';
import addGroupsToTeacherReducer
  from './TeachersPage/addGroupsToTeacherReducer';

import changeFormTypeReducer from './AddUpdateItemForm/changeFormTypeReducer';
import dataToUpdateReducer
  from './AddUpdateItemForm/dataToUpdateReducer';

import loaderReducer from './loaderReducer';
import uploadPopupReducer from './uploadPopupReducer';
import uploadStatusReducer from './getUploadStatusReducer';

const reducer = combineReducers({
  students: getStudentsReducer,
  studentToAdd: addStudentReducer,
  studentToUpdate: updateStudentReducer,

  groups: getGroupsReducer,
  groupToAdd: addGroupReducer,
  groupToUpdate: updateGroupReducer,

  teachers: getTeacherReducer,
  teacherToAdd: addTeacherReducer,
  teacherToUpdate: updateTeachersReducer,

  uploadedStudentToGroupFiles: addStudentToGroupReducer,
  uploadedGroupsToTeacherFiles: addGroupsToTeacherReducer,

  formType: changeFormTypeReducer,
  dataToUpdate: dataToUpdateReducer,

  loading: loaderReducer,
  popup: uploadPopupReducer,
  uploadStatus: uploadStatusReducer,
});

export default reducer;
