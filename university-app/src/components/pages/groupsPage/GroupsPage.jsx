import React, {Component, Fragment} from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

import Spinner from '../../spinner';

import Dropzone from 'react-dropzone';

import store from "../../../store";
import {getGroups} from "../../../actions";

export default class GroupsPage extends Component {

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

  componentDidMount() {
    store.dispatch(getGroups());  // получаем данные с сервера до рендеринга
  }

  handleAdd(event) {
    event.preventDefault();
    console.log('uploaded files - ', this.state.accepted);
    this.props.onAddGroup(this.state.accepted);
  }

  handleDelete() {
    this.props.onDeleteGroup(this.props.id);
  }

  handleUpdate(event) {
    event.preventDefault();
    console.log('uploaded files - ', this.state.accepted);
    this.props.onUpdateGroup(this.state.accepted);
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

    const spinner = this.props.loading ? <button type="submit" className="btn btn-primary">Submit</button> : <Spinner />;

    return (
      <Fragment>
        <ReactTable
          id="react-table"
          columns={columns}
          data={this.props.groups}
          filterable
          sortable
          defaultPageSize={5}
          noDataText={"Please wait..."}
        >
        </ReactTable>

        <br/>

        <div className="dropzone-container">
          <h3>ADD GROUP</h3>
          <p>Here you can upload excel file with data to add group to data base</p>
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
          <h3>UPDATE GROUP</h3>
          <p>Here you can upload excel file with data to update group in data base</p>
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
