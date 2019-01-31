import {connect} from 'react-redux';
import UpdateGroupForm from '../../components/pages/groupsPage/UpdateGroupForm';
import {updateGroup} from '../../actions/index';

function mapStateToProps(state) { // сопоставить состояния со свойствами. Эта функция для данных - массив с адресами
  return {
    dataGroupToUpdate: state.dataGroupToUpdate,
    groupToUpdate: state.groupToUpdate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateGroup: (id, number, teacher) => {
      console.log('Edit button clicked', id, number, teacher);
      dispatch(updateGroup(id, {number, teacher}));
    }
  };
}

const UpdateGroupFormContainer = connect(mapStateToProps, mapDispatchToProps)(
    UpdateGroupForm); // упрощенный синтаксис строк выше

export default UpdateGroupFormContainer;