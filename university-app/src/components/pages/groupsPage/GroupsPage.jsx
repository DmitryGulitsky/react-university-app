import React, {Component, Fragment} from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

import store from "../../../store";
import { getGroups } from "../../../actions";

export default class GroupsPage extends Component {

  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount(){
    store.dispatch(getGroups());  // получаем данные с сервера до рендеринга
  }

  handleAdd(event) {
    event.preventDefault();

    console.log(this.refs);

    console.log(this.refs.number.value);
    console.log(this.refs.teacher.value);

    const number = this.refs.number.value;
    const teacher = this.refs.teacher.value;

    this.props.onAddGroup(this.props.id, number, teacher);
  }

  handleDelete() {
    this.props.onDeleteStudent(this.props.id);
  }

  handleUpdate(event) {
    event.preventDefault();

    console.log(this.refs);

    console.log(this.refs.number.value);
    console.log(this.refs.teacher.value);

    const number = this.refs.number.value;
    const teacher = this.refs.teacher.value;

    this.props.onUpdateGroup(this.props.id, number, teacher);
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
        Header: "Group Number",
        accessor: "number"
      },
      {
        Header: "Teacher ID",
        accessor: "teacher.id"
      },
      {
        Header: "Delete",
        Cell: () => {
          return (
            <Fragment>
              <button className="btn btn-danger"
                      onClick={this.onDeleteGroup}
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
          data={this.props.groups}
          filterable
          sortable
          defaultPageSize={10}
          noDataText={"Please wait..."}
        >
        </ReactTable>

        <br/>

        <h3>ADD GROUP</h3>
        <form
          className="form-group"
          onSubmit={this.handleAdd}>
          <div className="form-group">
            <label htmlFor="addGroupNumberInput">Number</label>
            <input
              type="text"
              className="form-control"
              id="addGroupNumberInput"
              placeholder="Enter Group Number"
              ref="firstName"
              defaultValue={this.props.number}
            />
          </div>
          <div className="form-group">
            <label htmlFor="addGroupTeacherInput">Teacher</label>
            <input
              type="text"
              className="form-control"
              id="addGroupTeacherInput"
              placeholder="Enter Group Teacher"
              ref="lastName"
              defaultValue={this.props.teacher}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

        <br/>

        <h3>UPDATE GROUP</h3>
        <form
          className="form-group"
          onSubmit={this.handleUpdate}>
          <div className="form-group">
            <label htmlFor="updateGroupIdInput">ID</label>
            <input
              type="text"
              className="form-control"
              id="updateGroupIdInput"
              placeholder="Enter ID"
              ref="id"
              defaultValue={this.props.id}
            />
          </div>
          <div className="form-group">
            <label htmlFor="updateGroupNumberInput">Number</label>
            <input
              type="text"
              className="form-control"
              id="updateGroupNumberInput"
              placeholder="Enter Group Number"
              ref="number"
              defaultValue={this.props.number}
            />
          </div>
          <div className="form-group">
            <label htmlFor="updateGroupTeacherInput">Teacher</label>
            <input
              type="text"
              className="form-control"
              id="updateGroupTeacherInput"
              placeholder="Enter teacher"
              ref="teacher"
              defaultValue={this.props.teacher}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </Fragment>
    )
  }
}
