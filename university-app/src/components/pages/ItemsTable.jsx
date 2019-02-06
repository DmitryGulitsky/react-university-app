import React, {Component, Fragment} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import AddUpdateItemFormContainer
  from '../../containers/AddUpdateItemFormContainer';
import UploadPopupContainer
  from '../../containers/UploadPopupContainer';
import store from '../../store';
import {
  getGroups,
  getStudents,
  getStudentsById,
  getTeachers,
  getTeachersById,
  getGroupsById,
  addStudentFormType,
  addTeacherFormType,
  addGroupFormType,
  updateStudentFormType,
  updateTeacherFormType,
  updateGroupFormType
} from '../../actions';
import {
  ExcelExport,
  ExcelExportColumn
} from '@progress/kendo-react-excel-export';
import DropZoneForExcelContainer
  from '../../containers/DropZoneForExcelContainer';

export default class ItemsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      idGroup: '1',
      idTeacher: '1',
      displayAllItems: false,
      displayByItemsId: false,
      displayForm: false,
      tableData: {}
    };
    this.handleGetStudentsById = this.handleGetStudentsById.bind(this);
    this.handleGetTeachersById = this.handleGetTeachersById.bind(this);
    this.handleGetGroupsById = this.handleGetGroupsById.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddItemForm = this.handleAddItemForm.bind(this);
    this.handleUpdateItemForm = this.handleUpdateItemForm.bind(this);
    this.handleShowAllItems = this.handleShowAllItems.bind(this);
    this.handleShowItemsById = this.handleShowItemsById.bind(this);
    this.handleHideForm = this.handleHideForm.bind(this);
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

  handleShowAllItems() {
    const currentPage = this.props.page;
    switch(currentPage) {
      case 'studentsPage':
        store.dispatch(getStudents());
        break;
      case 'teachersPage':
        store.dispatch(getTeachers());
        break;
      case 'groupsPage':
        store.dispatch(getGroups());
        break;
      default:
        break;
    }
    this.setState({
      ...this.state,
      displayAllItems: true,
      displayByItemsId: false,
    });
  }

  handleShowItemsById() {

    const currentPage = this.props.page;
    switch(currentPage) {
      case 'studentsPage' || 'teachersPage':
        store.dispatch(getGroups());
        break;
      case 'groupsPage':
        store.dispatch(getTeachers());
        break;
      default:
        break;
    }

    this.setState({
      ...this.state,
      displayAllItems: false,
      displayByItemsId: true,
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleGetStudentsById(event){
    event.preventDefault();
    const id = this.state.idGroup;
    store.dispatch(getStudentsById(id));
  }

  handleGetTeachersById(event){
    event.preventDefault();
    const id = this.state.idGroup;
    store.dispatch(getTeachersById(id));
  }

  handleGetGroupsById(event){
    event.preventDefault();
    const id = this.state.idTeacher;
    store.dispatch(getGroupsById(id));
  }

  handleDelete(id) {
    const currentPage = this.props.page;
    switch (currentPage) {
      case 'studentsPage':
        this.props.onDeleteStudent(id);
        break;
      case 'teachersPage':
        this.props.onDeleteTeacher(id);
        break;
      case 'groupsPage':
        this.props.onDeleteGroup(id);
        break;
      default:
        break;
    }
  }
  handleUpdateItemForm(itemOriginal) {
    this.setState({
      ...this.state,
      displayForm: true
    });

    const exitButton = document.getElementById("exitButton");
    exitButton.style.display = "block";

    const currentPage = this.props.page;
    switch(currentPage) {
      case 'studentsPage':
        const student = {
          id: itemOriginal.id,
          firstName: itemOriginal.firstName,
          lastName: itemOriginal.lastName,
        };
        this.props.dataToUpdate(student);
        store.dispatch(updateStudentFormType());
        break;
      case 'teachersPage':
        const teacher = {
          id: itemOriginal.id,
          firstName: itemOriginal.firstName,
          lastName: itemOriginal.lastName
        };
        this.props.dataToUpdate(teacher);
        store.dispatch(updateTeacherFormType());
        break;
      case 'groupsPage':
        const group = {
          id: itemOriginal.id,
          number: itemOriginal.number,
          idTeacher: itemOriginal.teacher.id,
        };
        this.props.dataToUpdate(group);
        store.dispatch(updateGroupFormType());
        break;
      default:
        break;
    }
  }

  handleAddItemForm() {
    this.setState({
      ...this.state,
      displayForm: true
    });
    const exitButton = document.getElementById("exitButton");
    exitButton.style.display = "block";

    const currentPage = this.props.page;
    switch(currentPage) {
      case 'studentsPage':
        store.dispatch(addStudentFormType());
        break;
      case 'teachersPage':
        store.dispatch(addTeacherFormType());
        break;
      case 'groupsPage':
        store.dispatch(addGroupFormType());
        break;
      default:
        break;
    }
  }

  handleHideForm() {
    this.setState({
      ...this.state,
      displayForm: false
    });
    const exitButton = document.getElementById("exitButton");
    exitButton.style.display = "none";
  }

  render() {

    let inputByIdForm = this.state.displayByItemsId ? <p>error</p>
        : null;

    let columns = [
      {
        Header: 'ID',
        accessor: 'id',
        width: 100,
        maxWidth: 100,
        minWidth: 50
      }];

    const currentPage = this.props.page;
    switch (currentPage) {
      case 'studentsPage':
        columns = [
          {
            Header: 'ID',
            accessor: 'id',
            width: 100,
            maxWidth: 100,
            minWidth: 50
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
                            onClick={() => this.handleDelete(
                                props.original.id)}>
                      <span className="fa fa-trash"/>
                    </button>
                    <button className="btn btn-warning"
                            onClick={() => this.handleUpdateItemForm(
                                props.original)}>
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

        inputByIdForm = this.state.displayByItemsId ? <form
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
        : null;
        this.tableData = this.props.students;
        break;
      case 'teachersPage':
        columns = [
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
                            onClick={() => this.handleDelete(
                                props.original.id)}>
                      <span className="fa fa-trash"/>
                    </button>
                    <button className="btn btn-warning"
                            onClick={() => this.handleUpdateItemForm(
                                props.original)}>
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
          }];

        inputByIdForm = this.state.displayByItemsId ? <form
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
        : null;
        this.tableData = this.props.teachers;
        break;
      case 'groupsPage':
        columns = [
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
            Header: 'Curator First Name',
            accessor: 'teacher.firstName'
          },
          {
            Header: 'Curator Last Name',
            accessor: 'teacher.lastName'
          },
          {
            Header: 'Delete',
            Cell: props => {
              return (
                  <Fragment>
                    <button className="btn btn-danger"
                            onClick={() => this.handleDelete(
                                props.original.id)}>
                      <span className="fa fa-trash"/>
                    </button>
                    <button className="btn btn-warning"
                            onClick={() => this.handleUpdateItemForm(
                                props.original)}>
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
          }];

        inputByIdForm = this.state.displayByItemsId ?
            <form
                id="get-id-form"
                className="form-group"
                onSubmit={this.handleGetGroupsById}>
              <div className="form-group">
                <div className="form-group">
                  <label htmlFor="id-number">Choose groups's curator</label>
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
        this.tableData = this.props.groups;
        break;
      default:
        break;
    }

    const addUpdateItemForm = this.state.displayForm ?
        <div>
          <AddUpdateItemFormContainer/>
        </div> :
        null;

    const dropZone = (this.props.page !== 'teachersPage') ?
        <DropZoneForExcelContainer/> :
        null;

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleShowAllItems}>Show all
            </button>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleShowItemsById}>Show by one item
            </button>

            {inputByIdForm}

            <ReactTable
                id="react-table"
                columns={columns}
                data={this.tableData}
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
                  onClick={this.export}> Export table content to Excel
              </button>

              <ExcelExport
                  data={this.tableData}
                  fileName="export.xlsx"
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
                      onClick={this.handleAddItemForm}> Add new item to data
                base
              </button>
              {dropZone}
            </div>

          <div className="add-update-form">
            <div
                id="exitButton"
                className="exit-button"
                onClick={this.handleHideForm}
            >X
            </div>
            {addUpdateItemForm}
          </div>

          <UploadPopupContainer />

        </Fragment>
    );
  }
}