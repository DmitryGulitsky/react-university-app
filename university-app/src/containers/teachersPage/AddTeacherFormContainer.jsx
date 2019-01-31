import { connect } from 'react-redux';

import AddTeacherForm from '../../components/pages/teachersPage/AddTeacherForm';

import { addTeacher } from "../../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    onAddTeacher: (firstName, lastName) => {
      dispatch(addTeacher({firstName, lastName}))
    },
  }
}

const AddTeacherFormContainer = connect(null, mapDispatchToProps)(AddTeacherForm);

export default AddTeacherFormContainer;