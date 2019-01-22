import React, {Component, Fragment} from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
// import {baseStyle, activeStyle, rejectStyle} from '../../../styles/reactTableStyles';

// import Spinner from '../../spinner';

// import Dropzone from 'react-dropzone';

import store from "../../../store";
import {getTeachers} from "../../../actions";

import {
  ExcelExport,
  ExcelExportColumn,
} from '@progress/kendo-react-excel-export';


export default class TeachersPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accepted: [],
      rejected: []
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
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

  // handleAdd(event) {
  //   event.preventDefault();
  //   console.log('uploaded files - ', this.state.accepted);
  //   this.props.onAddTeacher(this.state.accepted);
  // }

  handleAdd(event) {
    event.preventDefault();

    console.log('this.refs.firstNameToAdd.value - ',this.refs.firstNameToAdd.value);
    console.log('this.refs.lastNameToAdd.value - ',this.refs.lastNameToAdd.value);

    const firstName = this.refs.firstNameToAdd.value;
    const lastName = this.refs.lastNameToAdd.value;

    this.props.onAddTeacher(firstName, lastName);
  }

  handleDelete(id) {
    console.log(id);
    this.props.onDeleteTeacher(id);
  }

  handleUpdate(event) {
    event.preventDefault();

    console.log('this.refs.firstNameToUpdate.value - ',this.refs.firstNameToUpdate.value);
    console.log('this.refs.lastNameToUpdate.value - ',this.refs.lastNameToUpdate.value);

    const id = this.refs.idToUpdate.value;
    const firstName = this.refs.firstNameToUpdate.value;
    const lastName = this.refs.lastNameToUpdate.value;

    this.props.onUpdateTeacher(id, firstName, lastName);
  }

  // handleUpdate(event) {
  //   event.preventDefault();
  //   console.log('uploaded files - ', this.state.accepted);
  //   this.props.onUpdateTeacher(this.state.accepted);
  // }

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
            <Fragment>
              <button className="btn btn-danger"
                      onClick={() => this.handleDelete(props.original.id)}
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

  //  const spinner = this.props.loading ? <button type="submit" className="btn btn-primary">Submit</button> : <Spinner />;

    return (
      <Fragment>
        <ReactTable
          id="react-table"
          columns={columns}
          data={this.props.teachers}
          filterable
          sortable
          defaultPageSize={5}
          noDataText={"Please wait..."}
        >
        </ReactTable>

        <div>
          <button className="btn btn-primary" onClick={this.export}>Export teachers list to Excel</button>

          <ExcelExport
            data={this.props.teachers}
            fileName="teachers.xlsx"
            ref={(exporter) => { this._exporter = exporter; }}
          >
            <ExcelExportColumn field="id" title="id" width={200} />
            <ExcelExportColumn field="firstName" title="First Name" width={350} />
            <ExcelExportColumn field="lastName" title="Last Name" width={350} />

          </ExcelExport>
        </div>

        <br/>
        <div className="dropzone-container">
        <h3>ADD TEACHER</h3>
        <p>Here you can add new group to data base. Enter please first and last name, push the button. Teachers's ID
          generate automatically</p>
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
                ref="firstNameToAdd"
              />
            </div>
            <div className="form-group">
              <label htmlFor="addTeacherLastNameInput">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="addTeacherLastNameInput"
                placeholder="Enter Last Name"
                ref="lastNameToAdd"
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
      </div>

        <br/>

        <div className="dropzone-container">
          <h3>UPDATE TEACHER</h3>
          <p>Here you can upload excel file with data to update group in data base</p>
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
                ref="idToUpdate"
              />
            </div>
            <div className="form-group">
              <label htmlFor="updateTeacherFirstNameInput">First Name</label>
              <input
                type="text"
                className="form-control"
                id="updateTeacherFirstNameInput"
                placeholder="Enter First Name"
                ref="firstNameToUpdate"
              />
            </div>
            <div className="form-group">
              <label htmlFor="updateTeacherLastNameInput">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="updateTeacherLastNameInput"
                placeholder="Enter Last Name"
                ref="lastNameToUpdate"
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </Fragment>
    )
  }
}

// <Dropzone
//   accept="text/csv, application/vnd.ms-excel"
//   onDrop={(accepted, rejected) => {
//     this.setState({accepted, rejected});
//     console.log(accepted);
//     console.log(rejected);
//   }}
// >
//   {({getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles}) => {
//     let styles = {...baseStyle};
//     styles = isDragActive ? {...styles, ...activeStyle} : styles;
//     styles = isDragReject ? {...styles, ...rejectStyle} : styles;
//
//     return (
//       <div
//         {...getRootProps()}
//         style={styles}
//       >
//         <input {...getInputProps()} />
//         <div>
//           {isDragAccept ? 'Drop' : 'Drag'} files here...
//         </div>
//         {isDragReject && <div>Unsupported file type...</div>}
//       </div>
//     )
//   }}
// </Dropzone>
// <aside>
// <h4>Accepted files</h4>
// <ul>
//   {
//     this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
//   }
// </ul>
// <h4>Rejected files</h4>
// <ul>
//   {
//     this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
//   }
// </ul>
// </aside>
//
// <h3>If you want to upload files to server - push SUBMIT button below</h3>
// <form
// className="form-group"
// onSubmit={this.handleAdd}>
// {spinner}
// </form>



// <Dropzone
//   accept="text/csv, application/vnd.ms-excel"
//   onDrop={(accepted, rejected) => {
//     this.setState({accepted, rejected});
//     console.log(accepted);
//     console.log(rejected);
//   }}
// >
//   {({getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles}) => {
//     let styles = {...baseStyle};
//     styles = isDragActive ? {...styles, ...activeStyle} : styles;
//     styles = isDragReject ? {...styles, ...rejectStyle} : styles;
//
//     return (
//       <div
//         {...getRootProps()}
//         style={styles}
//       >
//         <input {...getInputProps()} />
//         <div>
//           {isDragAccept ? 'Drop' : 'Drag'} files here...
//         </div>
//         {isDragReject && <div>Unsupported file type...</div>}
//       </div>
//     )
//   }}
// </Dropzone>
// <aside>
// <h4>Accepted files</h4>
// <ul>
//   {
//     this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
//   }
// </ul>
// <h4>Rejected files</h4>
// <ul>
//   {
//     this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
//   }
// </ul>
// </aside>
//
// <h3>If you want to upload files to server - push SUBMIT button below</h3>
// <form
// className="form-group"
// onSubmit={this.handleAdd}>
// {spinner}
// </form>