import {connect} from 'react-redux';

import AddStudentToGroupsPage
  from '../../components/pages/groupsPage/AddStudentToGroupsPage';

import {addStudentToGroup} from '../../actions/index';

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    uploadedStudentToGroupFiles: state.uploadedStudentToGroupFiles, // копируем в объект uploadedFiles
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAddStudentToGroup: (uploadedStudentToGroupFiles) => {
      console.log('Upload button clicked');
      dispatch(addStudentToGroup(uploadedStudentToGroupFiles));
    }
  };
}

const StudentsPageContainer = connect(mapStateToProps, mapDispatchToProps)(
    AddStudentToGroupsPage);

export default StudentsPageContainer;