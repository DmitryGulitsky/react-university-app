import React, {Component, Fragment} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import UpdateTeacherFormContainer
  from '../../../containers/teachersPage/UpdateTeacherFormContainer';
import AddTeacherFormContainer
  from '../../../containers/teachersPage/AddTeacherFormContainer';
import AddGroupsToTeacherPageContainer
  from '../../../containers/AddGroupsToTeacherPageContainer';
import store from '../../../store';
import {getTeachers} from '../../../actions';
import {
  ExcelExport,
  ExcelExportColumn
} from '@progress/kendo-react-excel-export';

export default class TeachersPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accepted: [],
      rejected: [],
      firstNameToUpdate: '',
      firstNameError: '',
      lastNameToUpdate: '',
      idGroupToUpdate: '',
      displayAddForm: false,
      displayUpdateForm: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddTeacherForm = this.handleAddTeacherForm.bind(this);
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
    store.dispatch(getTeachers());  // получаем данные с сервера до рендеринга
  }

  handleDelete(id) {
    console.log(id);
    this.props.onDeleteTeacher(id);
  }

  handleIdTeacherAdd(teacherOriginal) {
    this.setState({
      ...this.state,
      displayAddForm: false,
      displayUpdateForm: true
    });

    const teacher = {
      id: teacherOriginal.id,
      firstName: teacherOriginal.firstName,
      lastName: teacherOriginal.lastName
    };
    this.props.dataTeacherToUpdate(teacher);
  }

  handleAddTeacherForm() {
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

    const addTeacherForm = this.state.displayAddForm ?
        <AddTeacherFormContainer/> :
        null;
    const updateTeacherForm = this.state.displayUpdateForm ?
        <UpdateTeacherFormContainer/> :
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

            <div>
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
          {addTeacherForm}
          <br/>
          {updateTeacherForm}
          <br/>
          <AddGroupsToTeacherPageContainer/>
        </Fragment>
    );
  }
}