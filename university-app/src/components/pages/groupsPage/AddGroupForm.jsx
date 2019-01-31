import React, {Component} from 'react';
import "react-table/react-table.css";

export default class AddGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      numberError: "",
      teacher: ""
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
      numberError: '',
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

    const err = this.validate();
    if (!err) {
      // clear form
      this.setState({
        ...this.state,
        number: '',
        numberError: '',
        teacher: ''
      });

      const number = this.state.number;
      const teacher = this.state.teacher;

      this.props.onAddGroup(number, teacher);
    }
  }

  render()
  {
    const numberErrorText = this.state.numberError ?
        <p className="text-danger">{this.state.numberError}</p> :
        null;

        const addGroupForm =
            <div className="dropzone-container gradient-background">
              <h3>ADD GROUP</h3>
              <p>Here you can add group to data base. Group's ID generate automatically</p>
              <form
                  className="form-group"
                  onSubmit={this.handleAdd}>
                <div className="form-group">
                  <label htmlFor="addGroupNumberInput">Number</label>
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
                  <label htmlFor="addGroupTeacherInput">Curator ID of the group</label>
                  <input
                      name="teacher"
                      type="text"
                      className="form-control"
                      id="addGroupTeacherInput"
                      onChange={e => this.handleChange(e)}
                      placeholder="Enter Group's curator ID"
                  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>;

    return (
        <div>
          {addGroupForm}
        </div>
    )
  }
}