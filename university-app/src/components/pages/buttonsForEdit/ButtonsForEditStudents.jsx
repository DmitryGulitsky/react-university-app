import React, {Fragment} from 'react';

class ButtonsForEditStudents extends React.Component {

  render() {

    return (
      <Fragment>
        <button
          className="btn btn-secondary"
          onClick={this.onAddStudent}
        >Add</button>
        <button
          className="btn btn-secondary"
          onClick={this.onUpdateStudent}
        >Edit
        </button>
        <button className="btn btn-danger"
                onClick={this.onDeleteStudent}
        >Delete
        </button>
      </Fragment>
    );
  }
}

export default ButtonsForEditStudents;