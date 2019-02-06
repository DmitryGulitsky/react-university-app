import React, {Component, Fragment} from 'react';
import ItemsTableContainer from '../../../containers/ItemsTableContainer';
import {
  getTeachers,
  changeToTeachersPage
} from '../../../actions';
import store from '../../../store';

export default class TeachersPage extends Component {

  componentDidMount() {
    store.dispatch(getTeachers());
    store.dispatch(changeToTeachersPage());
  }

  render() {
    return (
        <Fragment>
          <div className="dropzone-container gradient-background">
            <h4 className="gradient-background">TEACHERS LIST</h4>
            <p className=" gradient-background">Here you can see teachers data
              base. Push, please, the red button to delete, or orange to update
              teacher
              <br/>
              To download Excel file with teachers list push the blue button. To
              add teacher to database push the orange one.
            </p>
            <ItemsTableContainer/>
          </div>
        </Fragment>
    );
  }
}