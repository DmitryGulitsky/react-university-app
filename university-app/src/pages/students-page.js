import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css"

export default class StudentsPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      posts: []
    }
  }
  componentDidMount(){
    const url = "http://localhost:8080/university/students"

    fetch(url, {
      method: "GET"
    }).then(response => response.json()).then(posts => {
      console.log("posts", posts)
    })
  }

  render() {
    const columns = [
      {
        Header: "ID",
        accessor: "id"
      },
      {
        Header: "First Name",
        accessor: "firstName"
      },
      {
        Header: "Last Name",
        accessor: "lastName"
      }
    ]
    return (
      <div>
        <h2>students page</h2>
        <ReactTable
        column={columns}
        data={this.state.posts}

        >

        </ReactTable>
      </div>
    );
  }
}
