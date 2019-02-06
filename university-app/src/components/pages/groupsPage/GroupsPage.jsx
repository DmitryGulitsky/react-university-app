import React, {Component, Fragment} from 'react';
import ItemsTableContainer from '../../../containers/ItemsTableContainer';
import {
  getGroups,
  changeToGroupsPage
} from '../../../actions';
import store from '../../../store';

export default class GroupsPage extends Component {

  componentDidMount() {
    store.dispatch(getGroups());
    store.dispatch(changeToGroupsPage());
  }

  render() {
    return (
        <Fragment>
          <div className="dropzone-container gradient-background">
            <h4 className="gradient-background">GROUPS LIST</h4>
            <p className=" gradient-background">Here you can see groups data
              base. Push, please, the red button to delete, or orange to update
              group
              <br/>
              To download Excel file with groups list push the blue button. To
              add group to database push the orange one
            </p>
            <ItemsTableContainer/>
          </div>
        </Fragment>
    );
  }
}