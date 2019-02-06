import { connect } from 'react-redux';
import TeachersPage from '../../components/pages/teachersPage/TeachersPage';

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const TeachersPageContainer = connect(null, null)(TeachersPage); // упрощенный синтаксис строк выше
export default TeachersPageContainer;