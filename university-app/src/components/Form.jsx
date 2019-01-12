import React from 'react';

import Button from './Button';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.store = this.props.store;

    this.handleChangeId = this.handleChangeId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const idNumber = this.state.idNumber;

    if (idNumber) {
      this.props.onChange(idNumber);
      this.setState({idNumber: ''});
    }
  }

  handleChangeId(event) {
    const idNumber = event.target.value;

    this.setState({idNumber});
  }

  render() {

    const disabled = !this.idNumber;

    return (
      <form className="todo-add-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          defaultValue="0"
          value={this.idNumber}
          placeholder="Введите ID"
          onChange={this.handleChangeId}/>
        <Button type="submit" disabled={disabled}>Добавить</Button>
      </form>
    );
  }
}

export default Form;