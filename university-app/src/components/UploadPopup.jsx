import React, {Component} from 'react';
import Popup from "reactjs-popup";
import {hidePopup} from '../actions';
import store from '../store';

export default class UploadPopup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      popup: this.props.popup
    }
  }
  componentDidMount(){
    console.log('POPUP this.props - ', this.props);
    console.log('POPUP this.state - ', this.state);
  }
  handleHidePopup() {
    store.dispatch(hidePopup())
  }
  render(){
    console.log('this.props.uploadStatus - ',this.props.uploadStatus);

    return (
        <Popup
            modal
            open={this.props.popup}
            position="right center"
            closeOnDocumentClick
            contentStyle={{ color: 'black'}}
        >
          {this.props.uploadStatus}
        </Popup>
    )};
}

//onClose={this.handleHidePopup()}