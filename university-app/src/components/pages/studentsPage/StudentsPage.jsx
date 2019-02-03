import React, {Component, Fragment} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import AddUpdateStudentsFormContainer
  from '../../../containers/AddUpdateStudentsFormContainer';
import store from '../../../store';
import {getGroups, getStudents, getStudentsById, addStudentFormType, updateStudentFormType} from '../../../actions';
import {
  ExcelExport,
  ExcelExportColumn
} from '@progress/kendo-react-excel-export';

export default class StudentsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      idGroup: '1',
      displayAllStudents: true,
      displayByGroupIdStudents: false,
      displayForm: false
    };
    this.handleGetStudentsById = this.handleGetStudentsById.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddStudentForm = this.handleAddStudentForm.bind(this);
    this.handleShowAllStudents = this.handleShowAllStudents.bind(this);
    this.handleShowStudentsByGroupId = this.handleShowStudentsByGroupId.bind(this);
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
  }

  handleShowAllStudents() {
    store.dispatch(getStudents());
    this.setState({
      ...this.state,
      displayAllStudents: true,
      displayByGroupIdStudents: false,
    });
  }

  handleShowStudentsByGroupId() {
    store.dispatch(getGroups());
    this.setState({
      ...this.state,
      displayAllStudents: false,
      displayByGroupIdStudents: true,
    });
  }

  handleChange = event => {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log('this.state - ',this.state);
  };

  handleGetStudentsById(event){
    event.preventDefault();
    console.log('this.state.idGroup - ',this.state.idGroup);
    const id = this.state.idGroup;

    store.dispatch(getStudentsById(id));
  }

  handleDelete(id) {
    console.log(id);
    this.props.onDeleteStudent(id);
  }

  handleIdStudentAdd(studentOriginal) {
    this.setState({
      ...this.state,
      displayForm: !this.state.displayForm
    });

    const student = {
      id: studentOriginal.id,
      firstName: studentOriginal.firstName,
      lastName: studentOriginal.lastName,
    };

    this.props.dataStudentToUpdate(student);
    store.dispatch(updateStudentFormType());
  }

  handleAddStudentForm() {
    this.setState({
      ...this.state,
      //displayUpdateForm: false,
      displayForm: !this.state.displayForm
    });
    store.dispatch(addStudentFormType());
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

    const inputGroupIdForm = this.state.displayByGroupIdStudents ?
        <form
            id="get-id-form"
            className="form-group"
            onSubmit={this.handleGetStudentsById}>
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="id-number">Choose students's group number</label>
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

    const addUpdateStudentForm = this.state.displayForm ?
        <div>
          <AddUpdateStudentsFormContainer/>
        </div> :
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
            <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleShowAllStudents}>Show all students
            </button>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleShowStudentsByGroupId}>Show by group number
            </button>

           {inputGroupIdForm}

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
          {addUpdateStudentForm}
          <br/>

        </Fragment>
    );
  }
}