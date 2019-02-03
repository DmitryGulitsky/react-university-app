import React, {Component} from 'react';
import {getGroups} from '../../../actions/index';
import store from '../../../store/index';

export default class AddUpdateStudentsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: this.props.formType,
      firstName: this.props.dataStudentToUpdate.firstName,
      firstNameError: '',
      lastName: this.props.dataStudentToUpdate.lastName,
      lastNameError: '',
      idGroup: '1',
      idToUpdate: this.props.dataStudentToUpdate.id
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    store.dispatch(getGroups());
    console.log('this.state - ',this.state);
    console.log('this.props - ',this.props)
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

  handleUpdate(event) {
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

      const id = this.state.idToUpdate;
      const firstName = this.state.firstName;
      const lastName = this.state.lastName;
      const groupId = this.state.idGroup;
      this.props.onUpdateStudent(id, firstName, lastName, groupId);
    }
  }

  render() {
    const addStudentFormHeader =
        <div>
          <h3>ADD STUDENT</h3>
          <p>Here you can add new student to data base. Enter please first and
            last name, number of the group. Then push the button. Student's ID
            generate automatically</p>
        </div>;
    const updateStudentFormHeader =
        <div>
          <h3>UPDATE STUDENT</h3>
          <p>Here you can update student in data base. Enter please id, first
            and last name, and current group ID.
            Then push the button.</p>
        </div>;
    const firstNameErrorText = this.state.firstNameError ?
        <p className="text-danger">{this.state.firstNameError}</p> :
        null;
    const lastNameErrorText = this.state.lastNameError ?
        <p className="text-danger">{this.state.lastNameError}</p> :
        null;
    const firstNameInput =
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
              name="firstName"
              type="text"
              className="form-control"
              id="firstName"
              onChange={e => this.handleChange(e)}
              placeholder="Enter First Name"
              defaultValue={this.state.firstName}
          />
          {firstNameErrorText}
        </div>;

    const lastNameInput =
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
              name="lastName"
              type="text"
              className="form-control"
              id="lastName"
              onChange={e => this.handleChange(e)}
              placeholder="Enter Last Name"
              defaultValue={this.state.lastName}
          />
          {lastNameErrorText}
        </div>

    const inputGroupIdForm =
        <div className="form-group">
          <label htmlFor="id-number">Choose students's group number</label>

          <select
              name="idGroup"
              className="form-control"
              id="id-number"
              onChange={e => this.handleChange(e)}
              defaultValue="1"
          >
            {this.props.groups && this.props.groups.map(group => {
              return (
                  <option value={group.id}
                          key={group.id}>{group.number}</option>
              );
            })}
          </select>
        </div>;

    const addStudentForm =
        <div className="dropzone-container gradient-background">
          {addStudentFormHeader}
          <form
              id="addStudentForm"
              className="add-student-form"
              onSubmit={this.handleAdd}>
            {firstNameInput}
            {lastNameInput}
            {inputGroupIdForm}
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>;

    const updateStudentForm =
        <div className="dropzone-container gradient-background">
          {updateStudentFormHeader}
          <form
              id="updateStudentForm"
              className="update-student-form"
              onSubmit={this.handleUpdate}>
            {firstNameInput}
            {lastNameInput}
            {inputGroupIdForm}
            <button
                type="submit"
                className="btn btn-primary"
            >Submit
            </button>
          </form>
        </div>;

    let formToRender;
    const currentType = this.state.formType;
    switch(currentType) {
      case 'addStudent':
        formToRender = addStudentForm;
        break;
      case 'updateStudent':
        formToRender = updateStudentForm;
        break;
      default:
        formToRender = <p>Error</p>
    }

    return (
        <div>
          {formToRender}
        </div>
    );
  }
}