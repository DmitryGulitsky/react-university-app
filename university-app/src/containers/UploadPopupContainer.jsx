import {connect} from 'react-redux';
import UploadPopup from '../components/UploadPopup';

function mapStateToProps(state) {
  return {
    popup: state.popup,
  };
}

const UploadPopupContainer = connect(mapStateToProps, null)(
    UploadPopup);
export default UploadPopupContainer;