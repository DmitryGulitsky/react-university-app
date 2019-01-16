import React from 'react';

import SubmitButton from '../../Button';

class FormForEditStudents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ''
    };

    this.store = this.props.store;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const firstName = this.state.firstName;
    const lastName = this.state.lastName;

    if (firstName && lastName) {
      this.props.onAddStudent({firstName, lastName});
      this.setState({ firstName: '', lastName: '' });
    }
  }

  handleChange(event) {
    const title = event.target.value;

    this.setState({ title });
  }

  render() {
    const disabled = !this.state.firstName && !this.state.lastName;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.firstName}
          placeholder="Enter first name"
          onChange={this.handleChange} />
        <input
          type="text"
          value={this.state.lastName}
          placeholder="Enter last name"
          onChange={this.handleChange} />
        <SubmitButton />
      </form>
    );
  }
}

export default FormForEditStudents;