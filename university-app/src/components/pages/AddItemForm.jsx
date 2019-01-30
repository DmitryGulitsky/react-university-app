import React, {Component} from 'react';
import "react-table/react-table.css";

export default class AddItemForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      firstNameError: "",
      lastName: "",
      lastNameError: "",
      idGroup: "",
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
        lastNameError: '',
        idGroup: ''
      });

      const firstName = this.state.firstName;
      const lastName = this.state.lastName;
      const groupId = this.state.idGroup;

      this.props.onAddStudent(firstName, lastName, groupId);
    }
  }

  render()
  {
    const firstNameErrorText = this.state.firstNameError ?
        <p className="text-danger">{this.state.firstNameError}</p> :
        null;
    const lastNameErrorText = this.state.lastNameError ?
        <p className="text-danger">{this.state.lastNameError}</p> :
        null;

    const addStudentForm =
        <div className="dropzone-container gradient-background">
          <h3>ADD STUDENT</h3>
          <p>Here you can add new student to data base. Enter please first and
            last name, id of the group. Then
            push the button. Student's ID generate automatically</p>
          <form
              id="addStudentForm"
              className="add-student-form"
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
              <label htmlFor="lastName">Last Name</label>
              <input
                  name="lastName"
                  type="text"
                  className="form-control"
                  id="lastName"
                  onChange={e => this.handleChange(e)}
                  placeholder="Enter Last Name"
              />
              {lastNameErrorText}
            </div>
            <div className="form-group">
              <label htmlFor="id-number">Enter students's group ID
                number</label>
              <input
                  name="idGroup"
                  type="number"
                  className="form-control"
                  id="id-number"
                  onChange={e => this.handleChange(e)}
                  placeholder="1"
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>;

    return (
        <div>
          {addStudentForm}
        </div>
    )
  }
}