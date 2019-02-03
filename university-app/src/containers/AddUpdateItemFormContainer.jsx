import {connect} from 'react-redux';
import AddUpdateItemForm from '../components/pages/AddUpdateItemForm';
import {
  addStudent,
  updateStudent,
  addTeacher,
  updateTeacher,
  addGroup,
  updateGroup
} from '../actions';

function mapStateToProps(state) {
  return {
    teachers: state.teachers,
    groups: state.groups,
    dataToUpdate: state.dataToUpdate,
    studentToUpdate: state.studentToUpdate,
    teacherToUpdate: state.teacherToUpdate,
    groupToUpdate: state.groupToUpdate,
    formType: state.formType
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAddStudent: (firstName, lastName, groupId) => {
      dispatch(addStudent({firstName, lastName}, groupId));
    },
    onUpdateStudent: (id, firstName, lastName, groupId) => {
      dispatch(updateStudent(id, {firstName, lastName}, groupId));
    },
    onAddTeacher: (firstName, lastName) => {
      dispatch(addTeacher({firstName, lastName}))
    },
    onUpdateTeacher: (id, firstName, lastName) => {
      dispatch(updateTeacher(id, {firstName, lastName}))
    },
    onAddGroup: (number, curator, teachers) => {
      dispatch(addGroup(number, curator, teachers));
    },
    onUpdateGroup: (id, number, teacher) => {
      dispatch(updateGroup(id, {number, teacher}));
    }
  };
}

const AddUpdateItemFormContainer = connect(mapStateToProps, mapDispatchToProps)(
    AddUpdateItemForm);

export default AddUpdateItemFormContainer;