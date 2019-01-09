import React, {Component} from 'react';

export default class TeachersPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      posts: []
    }
  }
  componentDidMount(){
    const url = "http://localhost:8080/university/teachers"

    fetch(url, {
      method: "GET"
    }).then(response => response.json()).then(posts => {
      console.log("posts", posts)
    })
  }

  render() {
    return (
      <div>teachers page</div>
    );
  }
}

