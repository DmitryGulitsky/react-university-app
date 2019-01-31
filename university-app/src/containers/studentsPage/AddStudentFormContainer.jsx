import {connect} from 'react-redux';

import AddStudentForm from '../../components/pages/studentsPage/AddStudentForm';

import {addStudent} from '../../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    onAddStudent: (firstName, lastName, groupId) => {
      dispatch(addStudent({firstName, lastName}, groupId));
    }
  };
}

const AddStudentFormContainer = connect(null, mapDispatchToProps)(
    AddStudentForm);

export default AddStudentFormContainer;