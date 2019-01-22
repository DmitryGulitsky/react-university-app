import React, {Component, Fragment} from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
// import {baseStyle, activeStyle, rejectStyle} from '../../../styles/reactTableStyles'

import Spinner from '../../spinner';

// import Dropzone from 'react-dropzone';

import store from "../../../store";
import {getStudents} from "../../../actions";

import {
  ExcelExport,
  ExcelExportColumn,
} from '@progress/kendo-react-excel-export';

export default class StudentsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accepted: [],   // массив файлов готовых к отправке
      rejected: [],   // массив отклоненных
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
    store.dispatch(getStudents());  // получаем данные с сервера до рендеринга
  }

  // handleAdd(event) {
  //   event.preventDefault();
  //   console.log('uploaded files - ', this.state.accepted);
  //   console.log('this.props.loading - ', this.props.loading);
  //   this.props.onAddStudent(this.state.accepted);
  // }

  handleAdd(event) {
    event.preventDefault();

    console.log('this.refs.firstNameToAdd.value - ',this.refs.firstNameToAdd.value);
    console.log('this.refs.lastNameToAdd.value - ',this.refs.lastNameToAdd.value);

    console.log('this.props.loading - ', this.props.loading);

    const firstName = this.refs.firstNameToAdd.value;
    const lastName = this.refs.lastNameToAdd.value;
    const groupId = this.refs.groupIdNumberForAdd.value;

    this.props.onAddStudent(firstName, lastName, groupId);
  }

  handleDelete(id) {
    console.log(id);
    this.props.onDeleteStudent(id);
  }

  handleUpdate(event) {
    event.preventDefault();

    console.log('this.refs.firstNameToUpdate.value - ',this.refs.firstNameToUpdate.value);
    console.log('this.refs.lastNameToUpdate.value - ',this.refs.lastNameToUpdate.value);

    const id = this.refs.idToUpdate.value;
    const firstName = this.refs.firstNameToUpdate.value;
    const lastName = this.refs.lastNameToUpdate.value;
    const groupId = this.refs.groupIdNumberForUpdate.value;

    this.props.onUpdateStudent(id, firstName, lastName, groupId);
  }

  // handleUpdate(event) {
  //   event.preventDefault();
  //   console.log('uploaded files - ', this.state.accepted);
  //   this.props.onUpdateStudent(this.state.accepted);
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
            <button className="btn btn-danger"
                    onClick={() => this.handleDelete(props.original.id)}
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

    const spinner = this.props.loading ? <button type="submit" className="btn btn-primary">Submit</button> : <Spinner/>;

    return (
      <Fragment>
        <ReactTable
          id="react-table"
          columns={columns}
          data={this.props.students}
          filterable
          sortable
          defaultPageSize={5}
          noDataText={"Please wait..."}
        >
        </ReactTable>

        <div>
          <button className="btn btn-primary" onClick={this.export}>Export students list to Excel</button>

          <ExcelExport
            data={this.props.students}
            fileName="students.xlsx"
            ref={(exporter) => {
              this._exporter = exporter;
            }}
          >
            <ExcelExportColumn field="id" title="id" width={200}/>
            <ExcelExportColumn field="firstName" title="First Name" width={350}/>
            <ExcelExportColumn field="lastName" title="Last Name" width={350}/>

          </ExcelExport>
        </div>

        <br/>
        <div className="dropzone-container">
          <h3>ADD STUDENT</h3>
          <p>Here you can add new student to data base. Enter please first and last name, id of the group. Then
            push the button. Student's ID generate automatically</p>
          <form
            id="addStudentForm"
            className="add-student-form"
            onSubmit={this.handleAdd}>
            <div className="form-group">
              <label htmlFor="addStudentFirstNameInput">First Name</label>
              <input
                name="addStudentFirstNameInput"
                type="text"
                className="form-control"
                id="addStudentLastNameInput"
                placeholder="Enter First Name"
                ref="firstNameToAdd"
              />
            </div>
            <div className="form-group">
              <label htmlFor="addStudentLastNameInput">Last Name</label>
              <input
                name="addStudentLastNameInput"
                type="text"
                className="form-control"
                id="addStudentLastNameInput"
                placeholder="Enter Last Name"
                ref="lastNameToAdd"
              />
            </div>
            <div className="form-group">
              <label htmlFor="id-number">Enter students's group ID number</label>
              <input type="number" className="form-control" id="id-number" placeholder="1" ref="groupIdNumberForAdd" />
            </div>
            {spinner}
          </form>
        </div>
        <br/>

        <div className="dropzone-container">
          <h3>UPDATE STUDENT</h3>
          <p>Here you can update student in data base. Enter please id, first and last name, and current group ID.
            Then push the button.</p>
          <form
            id="updateStudentForm"
            className="update-student-form"
            onSubmit={this.handleUpdate}>
            <div className="form-group">
              <label htmlFor="updateStudentIDInput">ID</label>
              <input
                name="updateStudentIdInput"
                type="text"
                className="form-control"
                id="updateStudentIDInput"
                placeholder="Enter ID"
                ref="idToUpdate"
              />
            </div>
            <div className="form-group">
              <label htmlFor="updateStudentFirstNameInput">First Name</label>
              <input
                name="updateStudentFirstNameInput"
                type="text"
                className="form-control"
                id="updateStudentFirstNameInput"
                placeholder="Enter First Name"
                ref="firstNameToUpdate"
              />
            </div>
            <div className="form-group">
              <label htmlFor="updateStudentLastNameInput">Last Name</label>
              <input
                name="updateStudentLastNameInput"
                type="text"
                className="form-control"
                id="updateStudentLastNameInput"
                placeholder="Enter Last Name"
                ref="lastNameToUpdate"
              />
            </div>
            <div className="form-group">
              <label htmlFor="id-number">Enter student's current group ID number</label>
              <input type="number" className="form-control" id="id-number" placeholder="1" ref="groupIdNumberForUpdate" />
            </div>
            {spinner}
          </form>
        </div>
      </Fragment>
    )
  }
}

// <p>Here you can upload excel file with data to add student to data base</p>
// <Dropzone
// accept="text/csv, application/vnd.ms-excel"
// onDrop={(accepted, rejected) => {
//   this.setState({accepted, rejected});
//   console.log(accepted);
//   console.log(rejected);
// }}
// >
// {({getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles}) => {
//   let styles = {...baseStyle};
//   styles = isDragActive ? {...styles, ...activeStyle} : styles;
//   styles = isDragReject ? {...styles, ...rejectStyle} : styles;
//
//   return (
//     <div
//       {...getRootProps()}
//       style={styles}
//     >
//       <input {...getInputProps()} />
//       <div>
//         {isDragAccept ? 'Drop' : 'Drag'} files here...
//       </div>
//       {isDragReject && <div>Unsupported file type...</div>}
//     </div>
//   )
// }}
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

// <div className="dropzone-container">
//   <h3>UPDATE STUDENT</h3>
//   <p>Here you can upload excel file with data to update student in data base</p>
//   <Dropzone
//     accept="text/csv, application/vnd.ms-excel"
//     onDrop={(accepted, rejected) => {
//       this.setState({accepted, rejected});
//       console.log(accepted);
//       console.log(rejected);
//     }}
//   >
//     {({getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles}) => {
//       let styles = {...baseStyle};
//       styles = isDragActive ? {...styles, ...activeStyle} : styles;
//       styles = isDragReject ? {...styles, ...rejectStyle} : styles;
//
//       return (
//         <div
//           {...getRootProps()}
//           style={styles}
//         >
//           <input {...getInputProps()} />
//           <div>
//             {isDragAccept ? 'Drop' : 'Drag'} files here...
//           </div>
//           {isDragReject && <div>Unsupported file type...</div>}
//         </div>
//       )
//     }}
//   </Dropzone>
//   <aside>
//     <h4>Accepted files</h4>
//     <ul>
//       {
//         this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
//       }
//     </ul>
//     <h4>Rejected files</h4>
//     <ul>
//       {
//         this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
//       }
//     </ul>
//   </aside>
//
//   <h3>If you want to upload files to server - push SUBMIT button below</h3>
//   <form
//     className="form-group"
//     onSubmit={this.handleAdd}>
//     {spinner}
//   </form>
//
// </div>