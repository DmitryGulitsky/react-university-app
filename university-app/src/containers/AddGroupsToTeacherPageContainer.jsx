import {connect} from 'react-redux';

import AddGroupsToTeacherPage from '../components/pages/addGroupsToTeacherPage/AddGroupsToTeacherPage';

import {addGroupsToTeacher} from "../actions";

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    uploadedGroupsToTeacherFiles: state.uploadedGroupsToTeacherFiles, // копируем в объект uploadedFiles
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddGroupsToTeacher: (uploadedGroupsToTeacherFiles) => {
      console.log('Upload button clicked');
      dispatch(addGroupsToTeacher(uploadedGroupsToTeacherFiles))
    },
  }
}

const AddGroupsToTeacherPageContainer = connect(mapStateToProps, mapDispatchToProps)(AddGroupsToTeacherPage);


export default AddGroupsToTeacherPageContainer;