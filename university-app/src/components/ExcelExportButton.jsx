import React, {Component, Fragment} from 'react';
import "react-table/react-table.css";

import store from "../../../store";
import {getStudentsById, getTeachersById, getGroupsById} from "../../../actions";

import {
  ExcelExport,
  ExcelExportColumn,
} from '@progress/kendo-react-excel-export';

export default class GetById extends Component {

  constructor(props) {
    super(props);

    this.handleGetById = this.handleGetById.bind(this);
  }

  _exporter;
  export = (getById) => {
    console.log(getById);
    this._exporter.save();
  };

  handleGetById(event) {
    event.preventDefault();

    console.log(this.refs.selectedIdType.value);
    console.log(this.refs.selectedIdNumber.value);

    switch (this.refs.selectedIdType.value) {
      case '1':
        store.dispatch(getStudentsById)
          .then(this.handleGetStudentsById(this.refs.selectedIdNumber.value))
          .then(console.log('case1'));
        return;

      case '2':
        this.handleGetTeachersById(this.refs.selectedIdNumber.value);
        console.log('case2');
        return ;

      case '3':
        this.handleGetGroupsById(this.refs.selectedIdNumber.value);
        console.log('case3');
        return ;

      default:
        return;
    }
  }

  render() {

    return (

        <div>
          <button className="k-button" onClick={this.export(this.props.getById)}>Export to Excel</button>

          <ExcelExport
            data={this.props.getById}
            fileName="export.xlsx"
            ref={(exporter) => { this._exporter = exporter; }}
          >
            <ExcelExportColumn field="id" title="id" width={200} />
            <ExcelExportColumn field="firstName" title="First Name" width={350} />
            <ExcelExportColumn field="lastName" title="Last Name" width={350} />

          </ExcelExport>
        </div>

    )
  }
}