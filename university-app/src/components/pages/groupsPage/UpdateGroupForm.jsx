import React, {Component} from 'react';
import 'react-table/react-table.css';

export default class UpdateGroupForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      idToUpdate: this.props.dataGroupToUpdate.id,
      numberToUpdate: this.props.dataGroupToUpdate.number,
      numberError: '',
      teacherToUpdate: this.props.dataGroupToUpdate.teacher
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
      numberError: ''
    };

    if (this.state.numberToUpdate.length < 3 ||
        this.state.numberToUpdate.length > 20) {
      isError = true;
      errors.firstNameError = 'Groups number needs to be from 3 to 20 characters long';
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
      const number = this.state.numberToUpdate;
      const teacher = this.state.teacherToUpdate;

      this.props.onUpdateGroup(id, number, teacher);
    }
  }

  render() {
    const numberErrorText = this.state.numberError ?
        <p className="text-danger">{this.state.numberError}</p> :
        null;

    const updateGroupForm =
        <div className="dropzone-container gradient-background">
          <h3>UPDATE GROUP</h3>
          <p>Here you can update group in data base</p>
          <form
              id="updateGroupForm"
              className="form-group"
              onSubmit={this.handleUpdate}>
            <div className="form-group">
              <label htmlFor="updateGroupIdInput">ID</label>
              <input
                  name="idToUpdate"
                  type="text"
                  className="form-control"
                  id="updateGroupIdInput"
                  onChange={e => this.handleChange(e)}
                  placeholder="Enter ID"
                  defaultValue={this.state.idToUpdate}
                  disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="updateGroupNumberInput">Number</label>
              <input
                  name="numberToUpdate"
                  type="text"
                  className="form-control"
                  id="updateGroupNumberInput"
                  onChange={e => this.handleChange(e)}
                  placeholder="Enter Group Number"
                  defaultValue={this.state.numberToUpdate}
              />
              {numberErrorText}
            </div>
            <div className="form-group">
              <label htmlFor="updateGroupTeacherInput">Teacher</label>
              <input
                  type="text"
                  className="form-control"
                  id="updateGroupTeacherInput"
                  placeholder="Enter teacher ID"
                  ref="teacherToUpdate"
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>;

    return (
        <div>
          {updateGroupForm}
        </div>
    );
  }
}