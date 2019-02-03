import React, {Component, Fragment} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import AddUpdateItemFormContainer
  from '../../../containers/AddUpdateItemFormContainer';
import AddGroupsToTeacherPageContainer
  from '../../../containers/teachersPage/AddGroupsToTeacherPageContainer';
import store from '../../../store';
import {
  getGroups,
  getTeachers,
  getTeachersById,
  addTeacherFormType,
  updateTeacherFormType,
} from '../../../actions';
import {
  ExcelExport,
  ExcelExportColumn
} from '@progress/kendo-react-excel-export';
import UploadPopupContainer from '../../../containers/UploadPopupContainer';

export default class TeachersPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      idGroup: '1',
      displayAllTeachers: true,
      displayByGroupIdTeachers: false,
      displayForm: false
    };
    this.handleGetTeachersById = this.handleGetTeachersById.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddTeacherForm = this.handleAddTeacherForm.bind(this);
    this.handleShowAllTeachers = this.handleShowAllTeachers.bind(this);
    this.handleShowTeachersByGroupId = this.handleShowTeachersByGroupId.bind(this);

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
    store.dispatch(getTeachers());
  }

  handleShowAllTeachers() {
    store.dispatch(getTeachers());
    this.setState({
      ...this.state,
      displayAllTeachers: true,
      displayByGroupIdTeachers: false,
    });
  }

  handleShowTeachersByGroupId() {
    store.dispatch(getGroups());
    this.setState({
      ...this.state,
      displayAllTeachers: false,
      displayByGroupIdTeachers: true,
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleGetTeachersById(event){
    event.preventDefault();
    const id = this.state.idGroup;
    store.dispatch(getTeachersById(id));
  }

  handleDelete(id) {
    this.props.onDeleteTeacher(id);
  }

  handleIdTeacherAdd(teacherOriginal) {
    this.setState({
      ...this.state,
      displayForm: !this.state.displayForm
    });

    const teacher = {
      id: teacherOriginal.id,
      firstName: teacherOriginal.firstName,
      lastName: teacherOriginal.lastName
    };
    this.props.dataToUpdate(teacher);
    store.dispatch(updateTeacherFormType());
  }

  handleAddTeacherForm() {
    this.setState({
      ...this.state,
      displayForm: !this.state.displayForm
    });
    store.dispatch(addTeacherFormType());
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
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'Last Name',
        accessor: 'lastName'
      },
      {
        Header: 'Delete/Update',
        Cell: props => {
          return (
              <Fragment>
                <button className="btn btn-danger"
                        onClick={() => this.handleDelete(props.original.id)}>
                  <span className="fa fa-trash"/>
                </button>
                <button className="btn btn-warning"
                        onClick={() => this.handleIdTeacherAdd(props.original)}>
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

    const inputGroupIdForm = this.state.displayByGroupIdTeachers ?
        <form
            id="get-id-form"
            className="form-group"
            onSubmit={this.handleGetTeachersById}>
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="id-number">Choose teacher's group number</label>
              <select
                  name="idGroup"
                  className="form-control"
                  id="id-number"
                  onChange={e => this.handleChange(e)}
                  defaultValue="1"
              >
                {this.props.groups && this.props.groups.map(group => {
                  return (
                      <option value={group.id}
                              key={group.id}>{group.number}</option>
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

    const addUpdateTeacherForm = this.state.displayForm ?
        <div>
          <AddUpdateItemFormContainer/>
        </div> :
        null;

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
            <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleShowAllTeachers}>Show all teachers
            </button>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleShowTeachersByGroupId}>Show by group number
            </button>

            {inputGroupIdForm}

            <ReactTable
                id="react-table"
                columns={columns}
                data={this.props.teachers}
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

            <div className="buttons-container">
              <button
                  className="btn btn-primary"
                  onClick={this.export}>Export teachers list to Excel
              </button>

              <ExcelExport
                  data={this.props.teachers}
                  fileName="teachers.xlsx"
                  ref={(exporter) => {
                    this._exporter = exporter;
                  }}
              >
                <ExcelExportColumn field="id" title="id" width={200}/>
                <ExcelExportColumn field="firstName" title="First Name"
                                   width={350}/>
                <ExcelExportColumn field="lastName" title="Last Name"
                                   width={350}/>

              </ExcelExport>

              <button type="button"
                      className="fa fa-plus-square btn btn-success"
                      onClick={this.handleAddTeacherForm}> Add teacher to data
                base
              </button>

            </div>
          </div>
          <br/>
          {addUpdateTeacherForm}
          <AddGroupsToTeacherPageContainer/>
          <UploadPopupContainer />
        </Fragment>
    );
  }
}