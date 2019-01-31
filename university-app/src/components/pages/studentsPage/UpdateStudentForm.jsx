import React, {Component} from 'react';
import 'react-table/react-table.css';

export default class UpdateStudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idToUpdate: this.props.dataStudentToUpdate.id,
      firstNameToUpdate: this.props.dataStudentToUpdate.firstName,
      firstNameError: '',
      lastNameToUpdate: this.props.dataStudentToUpdate.lastName,
      lastNameError: '',
      idGroupToUpdate: this.props.dataStudentToUpdate.idGroup
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      firstNameError: '',
      lastNameError: ''
    };

    if (this.state.firstNameToUpdate.length < 3 ||
        this.state.firstNameToUpdate.length > 20) {
      isError = true;
      errors.firstNameError = 'First name needs to be from 3 to 20 characters long';
    }
    if (this.state.lastNameToUpdate.length < 3 ||
        this.state.lastNameToUpdate.length > 20) {
      isError = true;
      errors.lastNameError = 'Last name needs to be from 3 to 20 characters long';
    }

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  handleUpdate(event) {
    event.preventDefault();

    const err = this.validate();
    if (!err) {
      // clear form
      this.setState({
        ...this.state,
        firstNameToUpdate: '',
        firstNameError: '',
        lastNameToUpdate: '',
        lastNameError: '',
        idGroupToUpdate: ''
      });

      const id = this.state.idToUpdate;
      const firstName = this.state.firstNameToUpdate;
      const lastName = this.state.lastNameToUpdate;
      const groupId = this.state.idGroupToUpdate;

      this.props.onUpdateStudent(id, firstName, lastName, groupId);
    }
  }

  render() {
    const firstNameErrorText = this.state.firstNameError ?
        <p className="text-danger">{this.state.firstNameError}</p> :
        null;
    const lastNameErrorText = this.state.lastNameError ?
        <p className="text-danger">{this.state.lastNameError}</p> :
        null;

    const updateStudentForm =
        <div className="dropzone-container gradient-background">
          <h3>UPDATE STUDENT</h3>
          <p>Here you can update student in data base. Enter please id, first
            and last name, and current group ID.
            Then push the button.</p>
          <form
              id="updateStudentForm"
              className="update-student-form"
              onSubmit={this.handleUpdate}>
            <div className="form-group">
              <label htmlFor="firstNameToUpdate">ID</label>
              <input
                  name="idToUpdate"
                  type="text"
                  className="form-control"
                  id="updateStudentIDInput"
                  onChange={e => this.handleChange(e)}
                  placeholder="Enter ID"
                  defaultValue={this.state.idToUpdate}
              />
            </div>
            <div className="form-group">
              <label htmlFor="updateStudentFirstNameInput">First Name</label>
              <input
                  name="firstNameToUpdate"
                  type="text"
                  className="form-control"
                  id="updateStudentFirstNameInput"
                  onChange={e => this.handleChange(e)}
                  placeholder="Enter First Name"
                  defaultValue={this.state.firstNameToUpdate}
              />
              {firstNameErrorText}
            </div>
            <div className="form-group">
              <label htmlFor="updateStudentLastNameInput">Last Name</label>
              <input
                  name="lastNameToUpdate"
                  type="text"
                  className="form-control"
                  id="updateStudentLastNameInput"
                  onChange={e => this.handleChange(e)}
                  placeholder="Enter Last Name"
                  defaultValue={this.state.lastNameToUpdate}
              />
              {lastNameErrorText}
            </div>
            <div className="form-group">
              <label htmlFor="id-number">Enter student's current group ID
                number</label>
              <input
                  name="idGroupToUpdate"
                  type="number"
                  className="form-control"
                  id="id-number" placeholder="1"
                  onChange={e => this.handleChange(e)}
              />
            </div>
            <button
                type="submit"
                className="btn btn-primary"
            >Submit
            </button>
          </form>
        </div>;
    return (
        <div>
          {updateStudentForm}
        </div>
    );
  }
}
