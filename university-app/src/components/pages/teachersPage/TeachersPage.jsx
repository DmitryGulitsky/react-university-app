import React, {Component, Fragment} from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

import store from "../../../store";
import {getTeachers} from "../../../actions";

export default class TeachersPage extends Component {

  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    store.dispatch(getTeachers());  // получаем данные с сервера до рендеринга
  }

  handleAdd(event) {
    event.preventDefault();

    console.log(this.refs);

    console.log(this.refs.firstName.value);
    console.log(this.refs.lastName.value);

    const firstName = this.refs.firstName.value;
    const lastName = this.refs.lastName.value;

    this.props.onAddTeacher(this.props.id, firstName, lastName);
  }

  handleDelete() {
    this.props.onDeleteTeacher(this.props.id);
  }

  handleUpdate(event) {
    event.preventDefault();

    console.log(this.refs);

    console.log(this.refs.firstName.value);
    console.log(this.refs.lastName.value);

    const firstName = this.refs.firstName.value;
    const lastName = this.refs.lastName.value;

    this.props.onUpdateTeacher(this.props.id, firstName, lastName);
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
            <Fragment>
              <button className="btn btn-danger"
                      onClick={this.handleDelete}
              >Delete
              </button>
            </Fragment>
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
          data={this.props.teachers}
          filterable
          sortable
          defaultPageSize={10}
          noDataText={"Please wait..."}
        >
        </ReactTable>

        <br/>

        <h3>ADD TEACHER</h3>
        <form
          className="form-group"
          onSubmit={this.handleAdd}>
          <div className="form-group">
            <label htmlFor="addTeacherFirstNameInput">First Name</label>
            <input
              type="text"
              className="form-control"
              id="addTeacherFirstNameInput"
              placeholder="Enter First Name"
              ref="firstName"
              defaultValue={this.props.firstName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="addTeacherLastNameInput">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="addTeacherLastNameInput"
              placeholder="Enter Last Name"
              ref="lastName"
              defaultValue={this.props.lastName}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

        <br/>

        <h3>UPDATE TEACHER</h3>
        <form
          className="form-group"
          onSubmit={this.handleUpdate}>
          <div className="form-group">
            <label htmlFor="updateTeacherIDInput">ID</label>
            <input
              type="text"
              className="form-control"
              id="updateTeacherIDInput"
              placeholder="Enter ID"
              ref="id"
              defaultValue={this.props.id}
            />
          </div>
          <div className="form-group">
            <label htmlFor="updateTeacherFirstNameInput">First Name</label>
            <input
              type="text"
              className="form-control"
              id="updateTeacherFirstNameInput"
              placeholder="Enter First Name"
              ref="firstName"
              defaultValue={this.props.firstName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="updateTeacherLastNameInput">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="updateTeacherLastNameInput"
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