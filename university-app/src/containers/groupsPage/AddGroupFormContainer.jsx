import {connect} from 'react-redux';
import AddGroupForm from '../../components/pages/groupsPage/AddGroupForm';
import {addGroup} from '../../actions/index';

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    teachers: state.teachers,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onAddGroup: (number, curator, teachers) => {
      dispatch(addGroup(number, curator, teachers));
    }
  };
}

const AddGroupFormContainer = connect(mapStateToProps, mapDispatchToProps)(AddGroupForm); // упрощенный синтаксис строк выше

export default AddGroupFormContainer;