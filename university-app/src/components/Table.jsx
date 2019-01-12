import React, {Component, Fragment} from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

import ButtonsForEditStudentsContainer from '../containers/ButtonsForEditStudentsContainer'
import ExportToExcel from "./ExportToExcel";

export default class Table extends Component {

  constructor(props) {
    super(props);
    }

  render() {

    const columns = [
      {
        Header: "ID",
        accessor: "id",
        width: 100,
        maxWidth: 100,
        minWidth: 100

      },
      {
        Header: "First Name",
        accessor: "firstName"
      },
      {
        Header: "Last Name",
        accessor: "lastName"
      },
      {
        Header: "Actions",
        Cell: () => {
          return (
            <ButtonsForEditStudentsContainer />
          )
        },
        filterable: false,
        sortable: false,
        width: 200,
        maxWidth: 200,
        minWidth: 200
      }
    ];
    return (
      <Fragment>
        <ReactTable
          id="react-table"
          columns={columns}
          data={this.urlPage}
          filterable
          sortable
          defaultPageSize={10}
          noDataText={"Please wait..."}
        >
          {(state, filteredData, instance) => {
            this.reactTable = state.pageRows.map(post => {
              return post._original
            });
            return (
              <div>
                {filteredData()}
                <ExportToExcel posts={this.reactTable}/>
              </div>
            )
          }}
        </ReactTable>
      </Fragment>
    )
  }
}

// <input type="text" ref="idNumber" defaultValue="0" />
// <button onClick={this.handleChangeId}>change id</button>
