import {connect} from 'react-redux';
import App from '../App';

function mapStateToProps(state) {
  return {
    loading: state.loading,
  };
}

const AppContainer = connect(mapStateToProps, null)(
    App);
export default AppContainer;