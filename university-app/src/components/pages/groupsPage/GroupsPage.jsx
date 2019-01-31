import React, {Component, Fragment} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import UpdateGroupFormContainer
  from '../../../containers/groupsPage/UpdateGroupFormContainer';
import AddGroupFormContainer
  from '../../../containers/groupsPage/AddGroupFormContainer';
import AddStudentToGroupsPageContainer
  from '../../../containers/AddStudentToGroupsPageContainer';
import store from '../../../store';
import {getGroups} from '../../../actions';
import {
  ExcelExport,
  ExcelExportColumn
} from '@progress/kendo-react-excel-export';

export default class GroupsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accepted: [],
      rejected: [],
      numberToUpdate: this.props.dataGroupToUpdate.number,
      numberError: '',
      teacherToUpdate: this.props.dataGroupToUpdate.teacher,
      displayAddForm: false,
      displayUpdateForm: false
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddGroupForm = this.handleAddGroupForm.bind(this);
  }

  _exporter;
  export = () => {
    this.save(this._exporter);
  };
  save = (component) => {
    const options = component.workbookOptions();
    const rows = options.sheets[0].rows;

    let altIdx = 0;
    rows.forEach((row) => {
      if (row.type === 'data') {
        if (altIdx % 2 !== 0) {
          row.cells.forEach((cell) => {
            cell.background = '#aabbcc';
          });
        }
        altIdx++;
      }
    });

    component.save(options);
  };

  componentDidMount() {
    store.dispatch(getGroups());  // получаем данные с сервера до рендеринга
  }

  handleDelete(id) {
    console.log(id);
    this.props.onDeleteGroup(id);
  }

  handleIdGroupAdd(groupOriginal) {
    this.setState({
      ...this.state,
      displayAddForm: false,
      displayUpdateForm: true
    });

    const group = {
      id: groupOriginal.id,
      number: groupOriginal.number,
      teacher: groupOriginal.teacher,
      groupId: '1'
    };

    this.props.dataGroupToUpdate(group);
  }

  handleAddGroupForm() {
    this.setState({
      ...this.state,
      displayUpdateForm: false,
      displayAddForm: !this.state.displayAddForm
    });
  }

  render() {

    const columns = [
      {
        Header: 'ID',
        accessor: 'id',
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: 'Group Number',
        accessor: 'number'
      },
      {
        Header: 'Teacher First Name',
        accessor: 'teacher.firstName'
      },
      {
        Header: 'Teacher Last Name',
        accessor: 'teacher.lastName'
      },
      {
        Header: 'Delete',
        Cell: props => {
          return (
              <Fragment>
                <button className="btn btn-danger"
                        onClick={() => this.handleDelete(props.original.id)}>
                  <span className="fa fa-trash"/>
                </button>
                <button className="btn btn-warning"
                        onClick={() => this.handleIdGroupAdd(props.original)}>
                  <span className="fa fa-pencil"/>
                </button>
              </Fragment>
          );
        },
        filterable: false,
        sortable: false,
        width: 120,
        maxWidth: 200,
        minWidth: 120
      }
    ];

    const addGroupForm = this.state.displayAddForm ?
        <AddGroupFormContainer/> :
        null;
    const updateGroupForm = this.state.displayUpdateForm ?
        <UpdateGroupFormContainer/> :
        null;

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
            <ReactTable
                id="react-table"
                columns={columns}
                data={this.props.groups}
                filterable
                sortable
                defaultPageSize={5}
                noDataText={'Please wait...'}
            >
            </ReactTable>

            <div>
              <button className="btn btn-primary fa fa-cloud-download"
                      onClick={this.export}>Export groups list to Excel
              </button>

              <ExcelExport
                  data={this.props.groups}
                  fileName="groups.xlsx"
                  ref={(exporter) => {
                    this._exporter = exporter;
                  }}
              >
                <ExcelExportColumn field="id" title="id" width={200}/>
                <ExcelExportColumn field="number" title="Number" width={350}/>
                <ExcelExportColumn field="teacher" title="Teacher" width={350}/>

              </ExcelExport>
              <button type="button"
                      className="fa fa-plus-square btn btn-success"
                      onClick={this.handleAddGroupForm}> Add group to data base
              </button>

            </div>
          </div>
          {addGroupForm}
          <br/>
          {updateGroupForm}
          <br/>
          <AddStudentToGroupsPageContainer/>
        </Fragment>
    );
  }
}