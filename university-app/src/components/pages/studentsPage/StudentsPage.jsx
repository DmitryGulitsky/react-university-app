import React, {Component, Fragment} from 'react';
import ItemsTableContainer from '../../../containers/ItemsTableContainer';
import {
  changeToStudentsPage,
  getStudents
} from '../../../actions';
import store from '../../../store';

export default class StudentsPage extends Component {
  componentDidMount(){
    store.dispatch(getStudents());
    store.dispatch(changeToStudentsPage());
  }
  render() {
    return (
        <Fragment>
          <div className="dropzone-container gradient-background">
            <h4 className="gradient-background">STUDENTS LIST</h4>
            <p className=" gradient-background">Here you can see students data
              base. Push, please, the red button to delete, or orange to update
              student
              <br/>
              To download Excel file with students list push the blue button. To
              add student to database push the orange one
            </p>
            <ItemsTableContainer/>
          </div>
        </Fragment>
    );
  }
}