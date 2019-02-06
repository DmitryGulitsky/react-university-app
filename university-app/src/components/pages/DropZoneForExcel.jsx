import React, {Component, Fragment} from 'react';
import Dropzone from 'react-dropzone';

export default class DropZoneForExcel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accepted: [],
      rejected: [],
      page: this.props.page
    };

    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(event) {
    event.preventDefault();

    console.log('DROPZONE this.props - ', this.props);
    console.log('uploaded files - ', this.state.accepted);
    console.log('this.state.page - ',this.state.page);
    const page = this.props.page;
    switch(page) {
      case 'teachersPage':
        this.props.onAddGroupToTeacher(this.state.accepted);
        break;
      case 'groupsPage':
        console.log('GROUPS PAGE UPLOAD');
        this.props.onAddStudentToGroup(this.state.accepted);
        break;
      default:
        break;
    }
  }

  render() {

    const baseStyle = {
      width: '33%',
      marginLeft: '33%',
      height: 40,
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

    let dropzoneText = <p>error</p>;
    const page = this.state.page;
    switch(page) {
      case 'teachersPage':
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

    return (
        <Fragment>

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
                      {isDragAccept ? 'Drop' : 'Drag'} Excel file here to
                      upload data...
                    </div>
                    {isDragReject && <div>Unsupported file type...</div>}
                  </div>
              );
            }}
          </Dropzone>
          <aside>
            <p>Accepted files</p>
            <ul>
              {
                this.state.accepted.map(
                    f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
              }
            </ul>
          </aside>
          <p style={{padding: 0}}>If you want to upload accepted files to
            server - push SUBMIT button
            below</p>
          <form
              className="form-group"
              onSubmit={this.handleAdd}>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>

        </Fragment>
    );
  }
}