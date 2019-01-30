import {connect} from 'react-redux';

import UpdateItemForm from '../components/pages/UpdateItemForm';

import {updateStudent} from '../actions';

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    dataStudentToUpdate: state.dataStudentToUpdate,
    studentToUpdate: state.studentToUpdate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateStudent: (id, firstName, lastName, groupId) => {
      console.log('Edit button clicked', id, firstName, lastName);
      dispatch(updateStudent(id, {firstName, lastName}, groupId));
    }
  };
}

const UpdateItemFormContainer = connect(mapStateToProps, mapDispatchToProps)(
    UpdateItemForm);

export default UpdateItemFormContainer;