import {connect} from 'react-redux';

import AddGroupsToTeacherPage
  from '../../components/pages/teachersPage/AddGroupsToTeacherPage';

import {addGroupsToTeacher} from '../../actions/index';

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    uploadedGroupsToTeacherFiles: state.uploadedGroupsToTeacherFiles, // копируем в объект uploadedFiles
    loading: state.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAddGroupToTeacher: (uploadedGroupsToTeacherFiles) => {
      console.log('Upload button clicked');
      dispatch(addGroupsToTeacher(uploadedGroupsToTeacherFiles));
    }
  };
}

const AddGroupsToTeacherPageContainer = connect(mapStateToProps,
    mapDispatchToProps)(AddGroupsToTeacherPage);

export default AddGroupsToTeacherPageContainer;