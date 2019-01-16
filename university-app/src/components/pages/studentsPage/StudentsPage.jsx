import React, {Component, Fragment} from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

import SubmitButton from '../SubmitButton';
// import FormForEditStudents from './FormForEditStudents';

// import ButtonsForEditStudentsContainer from '../../containers/ButtonsForEditStudentsContainer'

export default class StudentsPage extends Component {

  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleAdd(event) {
    event.preventDefault();

    const firstName = this.refs.title.value;
    const lastName = 'new last name';

    this.props.onUpdateStudent(this.props.id, {firstName, lastName});

  }

  handleDelete() {
    this.props.onDeleteStudent(this.props.id);
  }

  handleUpdate() {

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
        Cell: props => {
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
          data={this.urlPage}
          filterable
          sortable
          defaultPageSize={10}
          noDataText={"Please wait..."}
        >
        </ReactTable>

      </Fragment>
    )
  }
}


// <form onSubmit={this.handleSubmit}>
//   <input
//     type="text"
//
//     placeholder="Enter first name"
//     onChange={this.handleChange} />
//   <input
//     type="text"
//
//     placeholder="Enter last name"
//     onChange={this.handleChange} />
//   <SubmitButton />
// </form>