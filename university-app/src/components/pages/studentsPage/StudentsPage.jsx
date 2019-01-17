import React, {Component, Fragment} from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

import store from "../../../store";
import {getStudents} from "../../../actions";

export default class StudentsPage extends Component {

  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    store.dispatch(getStudents());  // получаем данные с сервера до рендеринга
  }

  handleAdd(event) {
    event.preventDefault();

    console.log(this.refs);

    console.log(this.refs.firstName.value);
    console.log(this.refs.lastName.value);

    const firstName = this.refs.firstName.value;
    const lastName = this.refs.lastName.value;

    this.props.onAddStudent(this.props.id, firstName, lastName);
  }

  handleDelete() {
    this.props.onDeleteStudent(this.props.id);
  }

  handleUpdate(event) {
    event.preventDefault();

    console.log(this.refs);

    console.log(this.refs.firstName.value);
    console.log(this.refs.lastName.value);

    const firstName = this.refs.firstName.value;
    const lastName = this.refs.lastName.value;

    this.props.onUpdateStudent(this.props.id, firstName, lastName);
  }

  render() {

    const columns = [
      {
        Header: "ID",
        accessor: "id",
        width: 100,
        maxWidth: 100,
        minWidth: 100

      },
      {
        Header: "First Name",
        accessor: "firstName"
      },
      {
        Header: "Last Name",
        accessor: "lastName"
      },
      {
        Header: "Delete",
        Cell: () => {
          return (
            <button className="btn btn-danger"
                    onClick={() => this.handleDelete()}
            >Delete
            </button>
          )
        },
        filterable: false,
        sortable: false,
        width: 200,
        maxWidth: 200,
        minWidth: 200
      }
    ];
    return (
      <Fragment>
        <ReactTable
          id="react-table"
          columns={columns}
          data={this.props.students}
          filterable
          sortable
          defaultPageSize={10}
          noDataText={"Please wait..."}
        >
        </ReactTable>

        <br/>

        <h3>ADD STUDENT</h3>
        <form
          className="add-student-form"
          onSubmit={this.handleAdd}>
          <div className="form-group">
            <label htmlFor="addStudentFirstNameInput">First Name</label>
            <input
              type="text"
              className="form-control"
              id="addStudentFirstNameInput"
              placeholder="Enter First Name"
              ref="firstName"
              defaultValue={this.props.firstName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="addStudentLastNameInput">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="addStudentLastNameInput"
              placeholder="Enter Last Name"
              ref="lastName"
              defaultValue={this.props.lastName}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

        <br/>

        <h3>UPDATE STUDENT</h3>
        <form
          className="add-student-form"
          onSubmit={this.handleUpdate}>
          <div className="form-group">
            <label htmlFor="updateStudentIDInput">ID</label>
            <input
              type="text"
              className="form-control"
              id="updateStudentIDInput"
              placeholder="Enter ID"
              ref="id"
              defaultValue={this.props.id}
            />
          </div>
          <div className="form-group">
            <label htmlFor="updateStudentFirstNameInput">First Name</label>
            <input
              type="text"
              className="form-control"
              id="updateStudentFirstNameInput"
              placeholder="Enter First Name"
              ref="firstName"
              defaultValue={this.props.firstName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="updateStudentLastNameInput">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="updateStudentLastNameInput"
              placeholder="Enter Last Name"
              ref="lastName"
              defaultValue={this.props.lastName}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

      </Fragment>
    )
  }
}