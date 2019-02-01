import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

export default class AddStudentToGroupsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accepted: [],
      rejected: []
    };

    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(event) {
    event.preventDefault();

    console.log('this.props - ', this.props);
    console.log('uploaded files - ', this.state.accepted);

    this.props.onAddStudentToGroup(this.state.accepted);
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

    return (
        <div className="dropzone-container gradient-background">
          <p>It's page to upload excel file with data to add student to a
            group</p>
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
              );
            }}
          </Dropzone>
          <aside>
            <h4>Accepted files</h4>
            <ul>
              {
                this.state.accepted.map(
                    f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
              }
            </ul>
            <h4>Rejected files</h4>
            <ul>
              {
                this.state.rejected.map(
                    f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
              }
            </ul>
          </aside>

          <h3>If you want to upload files to server - push SUBMIT button
            below</h3>
          <form
              className="form-group"
              onSubmit={this.handleAdd}>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>

        </div>
    );
  }
}