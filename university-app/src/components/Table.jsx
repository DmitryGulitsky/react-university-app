import React, {Component, Fragment} from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import ExportToExcel from "./ExportToExcel";

export default class Table extends Component {

  constructor(props) {
    super(props);

    this.store = this.props.store;

  }

  render(){



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
        Cell: props => {
          return(
            <Fragment>
              <button
                className="btn btn-secondary"
                onClick={props.onAddItem}
              >Add</button>
              <button
                className="btn btn-secondary"
                onClick={props.onEditItem}
              >Edit
              </button>
              <button className="btn btn-danger"
                      onClick={props.onDeleteItem}
              >Delete
              </button>
            </Fragment>
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
          data={this.store.urlPage}
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
        <p>current idNumber - {this.store.idNumber}</p>
        </Fragment>
    )
  }
}

// <input type="text" ref="idNumber" defaultValue="0" />
// <button onClick={this.handleChangeId}>change id</button>
