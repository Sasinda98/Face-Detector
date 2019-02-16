import React, { Component } from 'react';


class Message extends Component {
	constructor(props){
		super(props);
		this.state = {
					   name: 'name not defined',
					   entries: '0'
					 };
	}
	componentDidMount(){
	this.fetchMessage(17);	
	}
  render() {
  	
    return (
      <div className="">
       <p className="f3 washed-blue mv0"> {this.state.name}, you are ranked.... </p> <p className="f2 mv0 washed-blue">  #{this.state.entries} </p>
        <p className="f5 mv2">Provide a link to an image to recognize faces.</p>
      </div>
    );
  }

  fetchMessage = (id) => {
  	const url = 'https://gentle-peak-39635.herokuapp.com/profile/' + id; 

  	fetch(url)
	   .then(response => response.json())
	   .then(data => {
	    	this.setState({name: data.name, entries: data.entries});
	    });
  }

}

export default Message;
