import React, {Component} from 'react';
import {getGroups} from '../../actions/index';
import store from '../../store/index';
import {getTeachers} from '../../actions';

export default class AddUpdateItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: this.props.formType,
      firstName: this.props.dataToUpdate.firstName,
      firstNameError: '',
      lastName: this.props.dataToUpdate.lastName,
      lastNameError: '',
      idGroup: '1',
      idToUpdate: this.props.dataToUpdate.id,

      number: this.props.dataToUpdate.number,
      numberError: '',
      curator: this.props.dataToUpdate.idTeacher,
      teachers: [],
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.validate = this.validate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    store.dispatch(getGroups());
    store.dispatch(getTeachers());
  }

  onChange(e) {
    console.log('Checkbox checked name:', (e.target.name));
    console.log('Checkbox checked:', (e.target.checked));
    const teachers = this.state.teachers;
    let index;

    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to teachers array
      teachers.push(+e.target.name)
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = teachers.indexOf(+e.target.name);
      teachers.splice(index, 1)
    }
    // update the state with the new array of teachers
    this.setState({ teachers: teachers });
    console.log(this.state);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log('this.props -',this.props);
    console.log('this.state -',this.state);
    console.log('this.props.dataToUpdate -',this.props.dataToUpdate);
  };

  validate = () => {
    let isError = false;
    const errors = {
      firstNameError: '',
      lastNameError: '',
      numberError: ''
    };

    const currentType = this.state.formType;
    switch (currentType) {
      case 'addStudent' || 'updateStudent' || 'addTeacher' || 'updateTeacher':
        if (this.state.firstName.length < 3 || this.state.firstName.length > 20) {
          isError = true;
          errors.firstNameError = 'First name needs to be from 3 to 20 characters long';
        }
        if (this.state.lastName.length < 3 || this.state.lastName.length > 20) {
          isError = true;
          errors.lastNameError = 'Last name needs to be from 3 to 20 characters long';
        }
        break;
      case 'addGroup' || 'updateGroup':
        if (this.state.number.length < 3 || this.state.number.length > 20) {
          isError = true;
          errors.numberError = 'Group number needs to be from 3 to 20 characters long';
        }
        break;
      default:
        break;
    }

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  handleAdd(event) {
    event.preventDefault();

    console.log('this.props -',this.props);
    console.log('this.state -',this.state);

    const err = this.validate();
    if (!err) {
      // clear form
      this.setState({
        ...this.state,
        firstName: '',
        firstNameError: '',
        lastName: '',
        lastNameError: '',
        idGroup: '',
        number: '',
        numberError: '',
        curator: '',
        teachers: {}
      });

      const firstName = this.state.firstName;
      const lastName = this.state.lastName;
      const groupId = this.state.idGroup;

      const number = this.state.number;
      const curator = this.state.curator;
      const teachers = this.state.teachers;

      const currentType = this.state.formType;
      switch(currentType) {
        case 'addStudent':
          this.props.onAddStudent(firstName, lastName, groupId);
          break;
        case 'addTeacher':
          this.props.onAddTeacher(firstName, lastName, groupId);
          break;
        case 'addGroup':
          this.props.onAddGroup(number, curator, teachers);
          break;
        default:
          break;
      }
    }
  }

  handleUpdate(event) {
    event.preventDefault();

    console.log('this.props -',this.props);
    console.log('this.state -',this.state);

    const err = this.validate();
    if (!err) {
      // clear form
      this.setState({
        ...this.state,
        firstName: '',
        firstNameError: '',
        lastName: '',
        lastNameError: '',
        idGroup: '',
        number: '',
        numberError: '',
        curator: '',
        teachers: {}
      });

      const id = this.state.idToUpdate;

      const firstName = this.state.firstName;
      const lastName = this.state.lastName;
      const groupId = this.state.idGroup;

      const number = this.state.number;
      const teacher = this.state.curator;

      const currentType = this.state.formType;
      switch(currentType) {
        case 'updateStudent':
          this.props.onUpdateStudent(id, firstName, lastName, groupId);
          break;
        case 'updateTeacher':
          this.props.onUpdateTeacher(id, firstName, lastName);
          break;
        case 'updateGroup':
          this.props.onUpdateGroup(id, number, teacher);
          break;
        default:
          break;
      }
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

    const addTeacherFormHeader =
        <div>
          <h3>ADD TEACHER</h3>
          <p>Here you can add new group to data base. Enter please first and
            last name, push the button. Teachers's ID
            generate automatically</p>
        </div>;
    const updateTeacherFormHeader =
        <div>
          <h3>UPDATE TEACHER</h3>
          <p>Here you can update teacher in data base. Enter please first
            and last name. Then push the button.</p>
        </div>;

    const addGroupFormHeader =
        <div>
          <h3>ADD GROUP</h3>
          <p>Here you can add group to data base. Group's ID generate
            automatically</p>
        </div>;
    const updateGroupFormHeader =
        <div>
          <h3>UPDATE GROUP</h3>
          <p>Here you can update group in data base</p>
        </div>;


    const firstNameErrorText = this.state.firstNameError ?
        <p className="text-danger">{this.state.firstNameError}</p> :
        null;
    const lastNameErrorText = this.state.lastNameError ?
        <p className="text-danger">{this.state.lastNameError}</p> :
        null;
    const numberErrorText = this.state.numberError ?
        <p className="text-danger">{this.state.numberError}</p> :
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

    const  groupNumberInput =
        <div className="form-group">
          <label htmlFor="addGroupNumberInput">Enter number of the group</label>
          <input
              name="number"
              type="text"
              className="form-control"
              id="addGroupNumberInput"
              onChange={e => this.handleChange(e)}
              placeholder="Enter Group Number"
              defaultValue={this.state.number}
          />
          {numberErrorText}
        </div>;

    const chooseCuratorInput =
        <div className="form-group">
          <label htmlFor="addGroupTeacherInput">Choose curator of the
            group</label>
          <select
              name="curator"
              className="form-control"
              id="curator"
              onChange={e => this.handleChange(e)}
              defaultValue={this.state.curator}
          >
            {this.props.teachers && this.props.teachers.map(curator => {
              return (
                  <option value={curator.id} key={curator.id}>
                    {curator.firstName} {curator.lastName}</option>
              );
            })}
          </select>
        </div>;

    const inputTeachersList =
        <div>
          <p>Here you can choose teachers for the group</p>
          <div className="dropzone-container">
            <div className="custom-control custom-checkbox">

              {this.props.teachers && this.props.teachers.map(teacher => {
                return (
                    <p>
                      <label>
                        <input
                            name={teacher.id}
                            type="checkbox"
                            onChange={this.onChange}
                        /> {teacher.firstName} {teacher.lastName}
                      </label>
                    </p>
                );
              })}
            </div>
          </div>
        </div>;

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

    const addTeacherForm =
        <div className="dropzone-container gradient-background">
          {addTeacherFormHeader}
          <form
              id="addTeacherForm"
              className="add-teacher-form"
              onSubmit={this.handleAdd}>
            {firstNameInput}
            {lastNameInput}
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>;

    const updateTeacherForm =
        <div className="dropzone-container gradient-background">
          {updateTeacherFormHeader}
          <form
              id="updateTeacherForm"
              className="update-teacher-form"
              onSubmit={this.handleUpdate}>
            {firstNameInput}
            {lastNameInput}
            <button
                type="submit"
                className="btn btn-primary"
            >Submit
            </button>
          </form>
        </div>;

    const addGroupForm =
        <div className="dropzone-container gradient-background">
          {addGroupFormHeader}
          <form
              id="addGroupForm"
              className="add-group-form"
              onSubmit={this.handleAdd}>
            {groupNumberInput}
            {chooseCuratorInput}
            {inputTeachersList}
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>;

    const updateGroupForm =
        <div className="dropzone-container gradient-background">
          {updateGroupFormHeader}
          <form
              id="updateGroupForm"
              className="update-group-form"
              onSubmit={this.handleUpdate}>
            {groupNumberInput}
            {chooseCuratorInput}
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
      case 'addTeacher':
        formToRender = addTeacherForm;
        break;
      case 'updateTeacher':
        formToRender = updateTeacherForm;
        break;
      case 'addGroup':
        formToRender = addGroupForm;
        break;
      case 'updateGroup':
        formToRender = updateGroupForm;
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