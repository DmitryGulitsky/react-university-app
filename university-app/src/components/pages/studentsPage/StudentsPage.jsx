import React, {Component, Fragment} from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

import Spinner from '../../spinner';

import Dropzone from 'react-dropzone';

import store from "../../../store";
import {getStudents} from "../../../actions";

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

  componentDidMount() {
    store.dispatch(getStudents());  // получаем данные с сервера до рендеринга
  }

  handleAdd(event) {
    event.preventDefault();
    console.log('uploaded files - ', this.state.accepted);
    console.log('this.props.loading - ', this.props.loading);
    this.props.onAddStudent(this.state.accepted);
  }

  handleDelete() {
    this.props.onDeleteStudent(this.props.id);
  }

  handleUpdate(event) {
    event.preventDefault();
    console.log('uploaded files - ', this.state.accepted);
    this.props.onUpdateStudent(this.state.accepted);
  }

  render() {

    const baseStyle = {
      width: '33%',
      marginLeft: '33%',
      height: 200,
      borderWidth: 2,
      borderColor: '#666',
      borderStyle: 'dashed',
      borderRadius: 5
    };
    const activeStyle = {
      borderStyle: 'solid',
      borderColor: '#6c6',
      backgroundColor: '#eee'
    };
    const rejectStyle = {
      borderStyle: 'solid',
      borderColor: '#c66',
      backgroundColor: '#eee'
    };

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

    const spinner = this.props.loading ? <button type="submit" className="btn btn-primary">Submit</button> : <Spinner />;

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

        <br/>
        <div className="dropzone-container">
          <h3>ADD STUDENT</h3>
          <p>Here you can upload excel file with data to add student to data base</p>
          <Dropzone
            accept="text/csv, application/vnd.ms-excel"
            onDrop={(accepted, rejected) => {
              this.setState({accepted, rejected});
              console.log(accepted);
              console.log(rejected);
            }}
          >
            {({getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles}) => {
              let styles = {...baseStyle};
              styles = isDragActive ? {...styles, ...activeStyle} : styles;
              styles = isDragReject ? {...styles, ...rejectStyle} : styles;

              return (
                <div
                  {...getRootProps()}
                  style={styles}
                >
                  <input {...getInputProps()} />
                  <div>
                    {isDragAccept ? 'Drop' : 'Drag'} files here...
                  </div>
                  {isDragReject && <div>Unsupported file type...</div>}
                </div>
              )
            }}
          </Dropzone>
          <aside>
            <h4>Accepted files</h4>
            <ul>
              {
                this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
              }
            </ul>
            <h4>Rejected files</h4>
            <ul>
              {
                this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
              }
            </ul>
          </aside>

          <h3>If you want to upload files to server - push SUBMIT button below</h3>
          <form
            className="form-group"
            onSubmit={this.handleAdd}>
            {spinner}
          </form>
        </div>
        <br/>
        <div className="dropzone-container">
          <h3>UPDATE STUDENT</h3>
          <p>Here you can upload excel file with data to update student in data base</p>
          <Dropzone
            accept="text/csv, application/vnd.ms-excel"
            onDrop={(accepted, rejected) => {
              this.setState({accepted, rejected});
              console.log(accepted);
              console.log(rejected);
            }}
          >
            {({getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles}) => {
              let styles = {...baseStyle};
              styles = isDragActive ? {...styles, ...activeStyle} : styles;
              styles = isDragReject ? {...styles, ...rejectStyle} : styles;

              return (
                <div
                  {...getRootProps()}
                  style={styles}
                >
                  <input {...getInputProps()} />
                  <div>
                    {isDragAccept ? 'Drop' : 'Drag'} files here...
                  </div>
                  {isDragReject && <div>Unsupported file type...</div>}
                </div>
              )
            }}
          </Dropzone>
          <aside>
            <h4>Accepted files</h4>
            <ul>
              {
                this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
              }
            </ul>
            <h4>Rejected files</h4>
            <ul>
              {
                this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
              }
            </ul>
          </aside>

          <h3>If you want to upload files to server - push SUBMIT button below</h3>
          <form
            className="form-group"
            onSubmit={this.handleAdd}>
            {spinner}
          </form>

        </div>
      </Fragment>
    )
  }
}