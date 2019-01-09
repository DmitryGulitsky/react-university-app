import React, { Component } from 'react';

export default class GroupsPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      posts: []
    }
  }
  componentDidMount(){
    const url = "http://localhost:8080/university/groups"

    fetch(url, {
      method: "GET"
    }).then(response => response.json()).then(posts => {
      console.log("posts", posts)
    })
  }

  render() {
    return (
      <div>groups page</div>
    );
  }
}
