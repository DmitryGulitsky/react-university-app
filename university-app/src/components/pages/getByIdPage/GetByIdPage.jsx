import React, {Component, Fragment} from 'react';
import 'react-table/react-table.css';

import store from '../../../store';
import {
  getStudentsById,
  getTeachersById,
  getGroupsById
} from '../../../actions';

import {
  ExcelExport,
  ExcelExportColumn
} from '@progress/kendo-react-excel-export';

export default class GetById extends Component {

  constructor(props) {
    super(props);

    this.state = {value: '1'};

    this.handleGetById = this.handleGetById.bind(this);

  }

  _exporter;
  export = () => {
    this.save(this._exporter);
  };
  save = (component) => {
    const options = component.workbookOptions();
    const rows = options.sheets[0].rows;

    let altIdx = 0;
    rows.forEach((row) => {
      if (row.type === 'data') {
        if (altIdx % 2 !== 0) {
          row.cells.forEach((cell) => {
            cell.background = '#aabbcc';
          });
        }
        altIdx++;
      }
    });

    component.save(options);
  };

  handleGetById(event) {
    event.preventDefault();

    console.log('selected id type - ', this.refs.selectedIdType.value);
    console.log('selected id number - ', this.refs.selectedIdNumber.value);

    switch (this.refs.selectedIdType.value) {
      case '1':
        store.dispatch(getStudentsById(this.refs.selectedIdNumber.value));
        console.log('case1');
        return;

      case '2':
        store.dispatch(getTeachersById(this.refs.selectedIdNumber.value));
        console.log('case2');
        return;

      case '3':
        store.dispatch(getGroupsById(this.refs.selectedIdNumber.value));
        console.log('case3');
        return;

      default:
        return;
    }
  }

  render() {

    return (
        <Fragment>
          <h3>On this page you can get information from data base using ID</h3>
          <form
              id="get-id-form"
              className="form-group"
              onSubmit={this.handleGetById}>
            <div className="form-group">
              <div className="col-auto my-1">
                <label className="mr-sm-2" htmlFor="getByIdForm">Choose method
                  to get data</label>
                <select className="custom-select mr-sm-2" id="id-type"
                        ref="selectedIdType" value={this.state.value}>
                  <option selected>Choose what you want to get...</option>
                  <option value="1">Students of Group by Group ID</option>
                  <option value="2">Groups of Teacher by Teacher ID</option>
                  <option value="3">Teachers of Group by Group ID</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="id-number">Enter ID number</label>
                <input type="number" className="form-control" id="id-number"
                       placeholder="1" ref="selectedIdNumber"/>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary">GET IT FROM
                  SERVER
                </button>
              </div>
            </div>
          </form>

          <div>
            <button className="btn btn-primary" onClick={this.export}>Export to
              Excel
            </button>

            <ExcelExport
                data={this.props.getById}
                fileName="exportById.xlsx"
                ref={(exporter) => {
                  this._exporter = exporter;
                }}
            >
              <ExcelExportColumn field="id" title="id" width={200}/>
              <ExcelExportColumn field="firstName" title="First Name"
                                 width={350}/>
              <ExcelExportColumn field="lastName" title="Last Name"
                                 width={350}/>

              <ExcelExportColumn field="number" title="Number" width={350}/>

            </ExcelExport>
          </div>

        </Fragment>
    );
  }
}