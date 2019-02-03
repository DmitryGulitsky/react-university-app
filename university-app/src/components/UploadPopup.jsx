import React, {Component} from 'react';
import Popup from "reactjs-popup";
import {hidePopup} from '../actions';
import store from '../store';

export default class UploadPopup extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount(){
    console.log('this.props - ', this.props);
    console.log('this.state - ', this.state);
  }
  handleHidePopup() {
    store.dispatch(hidePopup())
  }
  render(){
    const popupTrigger = this.props.popup;
    return (
        <Popup
            modal
            open={popupTrigger}
            position="right center"
            closeOnDocumentClick
            onClose={this.handleHidePopup()}
        >
          <p>Upload completed!!!</p>
        </Popup>
    )};
}