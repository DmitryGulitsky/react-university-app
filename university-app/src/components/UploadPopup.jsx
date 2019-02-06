import React, {Component} from 'react';
import Popup from "reactjs-popup";
import {hidePopup} from '../actions';
import store from '../store';

export default class UploadPopup extends Component {

  constructor(props) {
    super(props);

  }

  handleHidePopup() {
    store.dispatch(hidePopup())
  }
  render(){
    return (
        <Popup
            modal
            open={this.props.popup}
            position="right center"
            closeOnDocumentClick
            contentStyle={{ color: 'black'}}
        >
          <a
              className="close"
              onClick={this.handleHidePopup}
          style={{
            backgroundColor: 'red',
            width: '20px',
          height: '20px'
          }}>
            &times;
          </a>
          {this.props.uploadStatus}
        </Popup>
    )};
}