import React, {Component, Fragment} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import UpdateStudentFormContainer
  from '../../../containers/studentsPage/UpdateStudentFormContainer';
import AddStudentFormContainer
  from '../../../containers/studentsPage/AddStudentFormContainer';
import store from '../../../store';
import {getStudents, getGroups} from '../../../actions';
import {
  ExcelExport,
  ExcelExportColumn
} from '@progress/kendo-react-excel-export';

export default class StudentsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accepted: [],   // массив файлов готовых к отправке
      rejected: [],   // массив отклоненных
      firstNameToUpdate: '',
      firstNameError: '',
      lastNameToUpdate: '',
      idGroupToUpdate: '',
      displayAddForm: false,
      displayUpdateForm: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddStudentForm = this.handleAddStudentForm.bind(this);
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
    store.dispatch(getStudents());  // получаем данные с сервера до рендеринга
    store.dispatch(getGroups());
  }

  handleDelete(id) {
    console.log(id);
    this.props.onDeleteStudent(id);
  }

  handleIdStudentAdd(studentOriginal) {
    this.setState({
      ...this.state,
      displayAddForm: false,
      displayUpdateForm: true
    });

    const student = {
      id: studentOriginal.id,
      firstName: studentOriginal.firstName,
      lastName: studentOriginal.lastName,
      groupId: '1'
    };

    this.props.dataStudentToUpdate(student);
  }

  handleAddStudentForm() {
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
              <div>
                <button className="btn btn-danger"
                        onClick={() => this.handleDelete(props.original.id)}>
                  <span className="fa fa-trash"/>
                </button>
                <button className="btn btn-warning"
                        onClick={() => this.handleIdStudentAdd(props.original)}>
                  <span className="fa fa-pencil"/>
                </button>
              </div>
          );
        },
        filterable: false,
        sortable: false,
        width: 120,
        maxWidth: 200,
        minWidth: 120
      }
    ];

    const addStudentForm = this.state.displayAddForm ?
        <AddStudentFormContainer/> :
        null;
    const updateStudentForm = this.state.displayUpdateForm ?
        <UpdateStudentFormContainer/> :
        null;

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
            <ReactTable
                id="react-table"
                columns={columns}
                data={this.props.students}
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
                  className="btn btn-primary fa fa-cloud-download"
                  onClick={this.export}> Export students list to Excel
              </button>

              <ExcelExport
                  data={this.props.students}
                  fileName="students.xlsx"
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
                      onClick={this.handleAddStudentForm}> Add student to data
                base
              </button>

            </div>
          </div>
          {addStudentForm}
          <br/>
          {updateStudentForm}
        </Fragment>
    );
  }
}