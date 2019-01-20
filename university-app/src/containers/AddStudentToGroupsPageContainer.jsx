import {connect} from 'react-redux';

import AddStudentToGroupsPage from '../components/pages/addStudentToGroupsPage/AddStudentToGroupsPage';

import {addStudentToGroup} from "../actions";

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    uploadedStudentToGroupFiles: state.uploadedStudentToGroupFiles, // копируем в объект uploadedFiles
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAddStudentToGroup: (uploadedStudentToGroupFiles) => {
      console.log('Upload button clicked');
      dispatch(addStudentToGroup(uploadedStudentToGroupFiles))
    },
  }
}

const StudentsPageContainer = connect(mapStateToProps, mapDispatchToProps)(AddStudentToGroupsPage);


export default StudentsPageContainer;