import React, {Component} from 'react';
import 'react-table/react-table.css';

export default class AddTeacherForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      firstNameError: '',
      lastName: '',
      lastNameError: ''
    };
    this.handleAdd = this.handleAdd.bind(this);
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

    if (this.state.firstName.length < 3 || this.state.firstName.length > 20) {
      isError = true;
      errors.firstNameError = 'First name needs to be from 3 to 20 characters long';
    }
    if (this.state.lastName.length < 3 || this.state.lastName.length > 20) {
      isError = true;
      errors.lastNameError = 'Last name needs to be from 3 to 20 characters long';
    }

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  handleAdd(event) {
    event.preventDefault();

    const err = this.validate();
    if (!err) {
      // clear form
      this.setState({
        ...this.state,
        firstName: '',
        firstNameError: '',
        lastName: '',
        lastNameError: ''
      });

      const firstName = this.state.firstName;
      const lastName = this.state.lastName;

      this.props.onAddTeacher(firstName, lastName);
    }
  }

  render() {
    const firstNameErrorText = this.state.firstNameError ?
        <p className="text-danger">{this.state.firstNameError}</p> :
        null;
    const lastNameErrorText = this.state.lastNameError ?
        <p className="text-danger">{this.state.lastNameError}</p> :
        null;

    const addTeacherForm =
        <div className="dropzone-container gradient-background">
          <h3>ADD TEACHER</h3>
          <p>Here you can add new group to data base. Enter please first and
            last name, push the button. Teachers's ID
            generate automatically</p>
          <form
              className="form-group"
              onSubmit={this.handleAdd}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                  name="firstName"
                  type="text"
                  className="form-control"
                  id="firstName"
                  onChange={e => this.handleChange(e)}
                  placeholder="Enter First Name"
              />
              {firstNameErrorText}
            </div>
            <div className="form-group">
              <label htmlFor="addTeacherLastNameInput">Last Name</label>
              <input
                  name="lastName"
                  type="text"
                  className="form-control"
                  id="addTeacherLastNameInput"
                  onChange={e => this.handleChange(e)}
                  placeholder="Enter Last Name"
              />
              {lastNameErrorText}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>;

    return (
        <div>
          {addTeacherForm}
        </div>
    );
  }
}