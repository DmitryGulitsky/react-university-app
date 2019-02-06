import React, {Component, Fragment} from 'react';
import Dropzone from 'react-dropzone';

export default class DropZoneForExcel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accepted: [],
      rejected: [],
      page: this.props.page,
      showUploadButton: false
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleShowUploadButton = this.handleShowUploadButton.bind(this);
  }

  handleAdd(event) {
    event.preventDefault();

    console.log('DROPZONE this.props - ', this.props);
    console.log('uploaded files - ', this.state.accepted);
    console.log('this.state.page - ', this.state.page);
    const page = this.props.page;
    switch (page) {
      case 'studentsPage':
        this.props.onAddStudentToGroup(this.state.accepted);
        break;
      case 'groupsPage':
        console.log('GROUPS PAGE UPLOAD');

        this.props.onAddGroupToTeacher(this.state.accepted);
        break;
      default:
        break;
    }
  }

  handleShowUploadButton() {
    this.setState({
      ...this.state,
      showUploadButton: true
    });
  }

  render() {

    const baseStyle = {
      width: '100%',
      margin: 0,
      padding: 0

      //borderWidth: 2,
      //borderColor: '#666',
      //borderStyle: 'dashed',
      //borderRadius: 5
    };
    const activeStyle = {
      color: 'black',
      borderStyle: 'solid',
      borderColor: '#6c6',
      backgroundColor: '#eee'
    };

    let dropzoneText = <p>error</p>;
    const page = this.state.page;
    switch (page) {
      case 'studentsPage':
        dropzoneText =
            <p>It's page to upload excel file with data to add groups to a
              teacher</p>;
        break;
      case 'groupsPage':
        dropzoneText =
            <p>It's page to upload excel file with data to add student to a
              group</p>;
        break;
      default:
        break;
    }

    const acceptedFilesInfo = (this.state.accepted.length !== 0) ?
        <Fragment>
          <button
              type="submit"
              className="btn btn-danger"
              onClick={this.handleAdd}>Upload!
          </button>
          <p>Accepted files</p>
          <ul>
            {
              this.state.accepted.map(
                  f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </Fragment>
        : null;

    return (
        <Fragment>
          <button
              type="submit"
              className="btn btn-secondary">
            <Dropzone

                accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onDrop={(accepted, rejected) => {
                  this.setState({accepted, rejected});
                  console.log(accepted);
                  console.log(rejected);
                }}
            >
              {({getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles}) => {
                let styles = {...baseStyle};
                styles = isDragActive ? {...styles, ...activeStyle} : styles;

                return (
                    <div
                        {...getRootProps()}
                        style={styles}
                    >
                      <input {...getInputProps()} />
                      <div>
                        {isDragAccept ? 'Drop' : 'Drag'} .xlsx to
                        upload data...
                      </div>
                      {isDragReject && <div>Unsupported file type...</div>}
                    </div>
                );
              }}
            </Dropzone>
          </button>
          {acceptedFilesInfo}
        </Fragment>
    );
  }
}

// <aside>
//   <p>Accepted files</p>
//   <ul>
//     {
//       this.state.accepted.map(
//           f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
//     }
//   </ul>
// </aside>