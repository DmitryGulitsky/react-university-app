import React, {Component} from 'react';
import "react-table/react-table.css";

export default class UpdateTeacherForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      idToUpdate: this.props.dataTeacherToUpdate.id,
      firstNameToUpdate: this.props.dataTeacherToUpdate.firstName,
      firstNameError: '',
      lastNameToUpdate: this.props.dataTeacherToUpdate.lastName,
      lastNameError: '',
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

      this.props.onUpdateTeacher(id, firstName, lastName);
    }
  }
  render() {
    const firstNameErrorText = this.state.firstNameError ?
        <p className="text-danger">{this.state.firstNameError}</p> :
        null;
    const lastNameErrorText = this.state.lastNameError ?
        <p className="text-danger">{this.state.lastNameError}</p> :
        null;

    const updateTeacherForm =
        <div className="dropzone-container gradient-background">
          <h3>UPDATE TEACHER</h3>
          <p>Here you can update teacher in data base. Enter please first
            and last name. Then push the button.</p>
          <form
              id="updateTeacherForm"
              className="form-group"
              onSubmit={this.handleUpdate}>
            <div className="form-group">
              <label htmlFor="updateTeacherIDInput">ID</label>
              <input
                  type="text"
                  className="form-control"
                  id="updateTeacherIDInput"
                  onChange={e => this.handleChange(e)}
                  placeholder="Enter ID"
                  defaultValue={this.state.idToUpdate}
              />
            </div>
            <div className="form-group">
              <label htmlFor="updateTeacherFirstNameInput">First Name</label>
              <input
                  name="firstNameToUpdate"
                  type="text"
                  className="form-control"
                  id="updateTeacherFirstNameInput"
                  onChange={e => this.handleChange(e)}
                  placeholder="Enter First Name"
                  ref="firstNameToUpdate"
                  defaultValue={this.state.firstNameToUpdate}
              />
              {firstNameErrorText}
            </div>
            <div className="form-group">
              <label htmlFor="updateTeacherLastNameInput">Last Name</label>
              <input
                  name="lastNameToUpdate"
                  type="text"
                  className="form-control"
                  id="updateTeacherLastNameInput"
                  onChange={e => this.handleChange(e)}
                  placeholder="Enter Last Name"
                  defaultValue={this.state.lastNameToUpdate}
              />
            </div>
            {lastNameErrorText}
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>;
    return (
        <div>
          {updateTeacherForm}
        </div>
    )
  }
}