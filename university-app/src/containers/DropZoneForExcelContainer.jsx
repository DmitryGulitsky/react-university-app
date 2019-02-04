import {connect} from 'react-redux';

import DropZoneForExcel
  from '../components/pages/DropZoneForExcel';

import {
  addStudentToGroup,
  addGroupsToTeacher
} from '../actions/index';

function mapStateToProps(state) {
  return {
    page: state.page,
    uploadedStudentToGroupFiles: state.uploadedStudentToGroupFiles,
    uploadedGroupsToTeacherFiles: state.uploadedGroupsToTeacherFiles,
    loading: state.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAddStudentToGroup: (uploadedStudentToGroupFiles) => {
      console.log('Upload button clicked');
      dispatch(addStudentToGroup(uploadedStudentToGroupFiles));
    },
    onAddGroupToTeacher: (uploadedGroupsToTeacherFiles) => {
      console.log('Upload button clicked');
      dispatch(addGroupsToTeacher(uploadedGroupsToTeacherFiles));
    }
  };
}

const DropZoneForExcelContainer = connect(mapStateToProps, mapDispatchToProps)(
    DropZoneForExcel);

export default DropZoneForExcelContainer;