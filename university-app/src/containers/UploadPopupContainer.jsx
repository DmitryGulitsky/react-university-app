import {connect} from 'react-redux';
import UploadPopup from '../components/UploadPopup';

function mapStateToProps(state) {
  return {
    popup: state.popup,
    uploadStatus: state.uploadStatus
  };
}

const UploadPopupContainer = connect(mapStateToProps, null)(
    UploadPopup);
export default UploadPopupContainer;