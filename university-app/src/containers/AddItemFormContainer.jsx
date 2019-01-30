import {connect} from 'react-redux';

import AddItemForm from '../components/pages/AddItemForm';

import {addStudent} from '../actions';

function mapDispatchToProps(dispatch) {
  return {
    onAddStudent: (firstName, lastName, groupId) => {
      console.log('Add button clicked', firstName, lastName);
      dispatch(addStudent({firstName, lastName}, groupId));
    }
  };
}

const AddItemFormContainer = connect(null, mapDispatchToProps)(
    AddItemForm);

export default AddItemFormContainer;