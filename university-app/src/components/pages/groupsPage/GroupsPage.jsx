import React, {Component, Fragment} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import AddUpdateItemFormContainer
  from '../../../containers/AddUpdateItemFormContainer';
import AddStudentToGroupsPageContainer
  from '../../../containers/groupsPage/AddStudentToGroupsPageContainer';
import store from '../../../store';
import {
  getGroups,
  getTeachers,
  getGroupsById,
  updateGroupFormType,
  addGroupFormType
} from '../../../actions';
import {
  ExcelExport,
  ExcelExportColumn
} from '@progress/kendo-react-excel-export';
import UploadPopupContainer from '../../../containers/UploadPopupContainer';

export default class GroupsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      idTeacher: '1',
      displayAllGroups: true,
      displayByTeacherIdGroups: false,
      displayForm: false
    };
    this.handleGetGroupsById = this.handleGetGroupsById.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddGroupForm = this.handleAddGroupForm.bind(this);
    this.handleShowAllGroups = this.handleShowAllGroups.bind(this);
    this.handleShowGroupsByTeacherId = this.handleShowGroupsByTeacherId.bind(this);

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
    store.dispatch(getGroups());
  }

  handleShowAllGroups() {
    store.dispatch(getGroups());
    this.setState({
      ...this.state,
      displayAllGroups: true,
      displayByTeacherIdGroups: false,
    });
  }

  handleShowGroupsByTeacherId() {
    store.dispatch(getTeachers());
    this.setState({
      ...this.state,
      displayAllGroups: false,
      displayByTeacherIdGroups: true,
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleGetGroupsById(event){
    event.preventDefault();
    const id = this.state.idTeacher;
    store.dispatch(getGroupsById(id));
  }

  handleDelete(id) {
    console.log(id);
    this.props.onDeleteGroup(id);
  }

  handleIdGroupAdd(groupOriginal) {
    this.setState({
      ...this.state,
      displayForm: !this.state.displayForm
    });

    const group = {
      id: groupOriginal.id,
      number: groupOriginal.number,
      idTeacher: groupOriginal.teacher.id,
    };
    this.props.dataToUpdate(group);
    store.dispatch(updateGroupFormType());
  }

  handleAddGroupForm() {
    this.setState({
      ...this.state,
      displayForm: !this.state.displayForm
    });
    store.dispatch(addGroupFormType());
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

    const inputTeacherIdForm = this.state.displayByTeacherIdGroups ?
        <form
            id="get-id-form"
            className="form-group"
            onSubmit={this.handleGetGroupsById}>
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="id-number">Choose groups's teacher first name</label>
              <select
                  name="idTeacher"
                  className="form-control"
                  id="id-number"
                  onChange={e => this.handleChange(e)}
                  defaultValue="1"
              >
                {this.props.teachers && this.props.teachers.map(teacher => {
                  return (
                      <option value={teacher.id}
                              key={teacher.id}>{teacher.firstName} {teacher.lastName}</option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">GET IT FROM
                SERVER
              </button>
            </div>
          </div>
        </form>
        :
        null;

    const addUpdateGroupForm = this.state.displayForm ?
        <div>
          <AddUpdateItemFormContainer/>
        </div> :
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
            <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleShowAllGroups}>Show all groups
            </button>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleShowGroupsByTeacherId}>Show by teacher
            </button>

            {inputTeacherIdForm}

            <ReactTable
                id="react-table"
                columns={columns}
                data={this.props.groups}
                filterable
                sortable
                defaultPageSize={5}
                noDataText={'Please wait...'}
            >
              {(state, makeTable) => {
                return (
                    <div
                        style={{
                          background: '#7b7b7b',
                          borderRadius: '5px',
                          overflow: 'hidden'
                        }}
                    >
                      {makeTable()}
                    </div>
                );
              }}
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
          <br/>
          {addUpdateGroupForm}
          <AddStudentToGroupsPageContainer/>
          <UploadPopupContainer />
        </Fragment>
    );
  }
}