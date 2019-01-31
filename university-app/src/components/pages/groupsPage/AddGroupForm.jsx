import React, {Component} from 'react';
import 'react-table/react-table.css';
import {getTeachers} from '../../../actions';
import store from '../../../store';
import 'rc-checkbox/assets/index.css';

//function onChange(e) {
//  console.log('Checkbox checked name:', (e.target.name));
//  console.log('Checkbox checked:', (e.target.checked));
//}

export default class AddGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      numberError: '',
      curator: '',
      teachers: [],
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.onChange = this.onChange.bind(this);
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

  componentDidMount() {
    store.dispatch(getTeachers());
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      numberError: ''
    };

    if (this.state.number.length < 3 || this.state.number.length > 20) {
      isError = true;
      errors.firstNameError = 'Group number needs to be from 3 to 20 characters long';
    }

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  handleAdd(event) {
    event.preventDefault();

    console.log(this.state);

    const err = this.validate();
    if (!err) {
      // clear form
      this.setState({
        ...this.state,
        number: '',
        numberError: '',
        curator: '',
        teachers: {}
      });

      console.log('STATE CURATOR - ', this.state.curator);

      const number = this.state.number;
      const curator = this.state.curator;
      const teachers = this.state.teachers;

      this.props.onAddGroup(number, curator, teachers);
    }
  }

  render() {

    const inputCuratorIdForm =
        <select
            name="curator"
            className="form-control"
            id="curator"
            onChange={e => this.handleChange(e)}
            defaultValue="1"
        >
          { this.props.teachers && this.props.teachers.map(curator => {
            return (
                <option value={curator.id} key={curator.id}>
                  {curator.firstName} {curator.lastName}</option>
            )
          })}
        </select>;

    const inputTeachersList =
        <div className="custom-control custom-checkbox">

          { this.props.teachers && this.props.teachers.map(teacher => {
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
            )

          })}
        </div>;

    const numberErrorText = this.state.numberError ?
        <p className="text-danger">{this.state.numberError}</p> :
        null;

    const addGroupForm =
        <div className="dropzone-container gradient-background">
          <h3>ADD GROUP</h3>
          <p>Here you can add group to data base. Group's ID generate
            automatically</p>
          <form
              className="form-group"
              onSubmit={this.handleAdd}>
            <div className="form-group">
              <label htmlFor="addGroupNumberInput">Enter number of the group</label>
              <input
                  name="number"
                  type="text"
                  className="form-control"
                  id="addGroupNumberInput"
                  onChange={e => this.handleChange(e)}
                  placeholder="Enter Group Number"
              />
              {numberErrorText}
            </div>
            <div className="form-group">
              <label htmlFor="addGroupTeacherInput">Choose curator of the
                group</label>
              {inputCuratorIdForm}
            </div>
            <p>Here you can choose teachers for the group</p>
            <div className="dropzone-container">
              {inputTeachersList}
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>;

    return (
        <div>
          {addGroupForm}
        </div>
    );
  }
}