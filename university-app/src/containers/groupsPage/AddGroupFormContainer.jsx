import { connect } from 'react-redux';

import AddGroupForm from '../../components/pages/groupsPage/AddGroupForm';

import { addGroup } from "../../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    onAddGroup: (number, teacher) => {
      dispatch(addGroup({number}, teacher))
    },
  }
}

const AddGroupFormContainer = connect(null, mapDispatchToProps)(AddGroupForm); // упрощенный синтаксис строк выше

export default AddGroupFormContainer;