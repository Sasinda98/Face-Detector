import React, { Component } from 'react';

class SignUp extends Component{
	constructor(props){
		super(props);
		this.state = {
						name: '',
						email: '',
						password: '',
					  };
	}

	render(){
		return(
		<div className="pa4 br2 ba dark-gray b--black-10 mv4 w-80  mw6 center" style={{marginTop:'10%'}}>
		  <div>
		    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
		      <h2 className="f1 ma1">Sign Up</h2>

    		<div className="mt3">
		        <label className="tl db fw4 lh-copy f6" htmlFor="text">Name</label>
		        <input onChange={this.onNameChange} className="br2 pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address"  id="email-address"/>
		      </div>
		      <div className="mt3">
		        <label className="tl db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
		        <input onChange={this.onEmailChange} className="br2 pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address"  id="email-address"/>
		      </div>
		      <div className="mt3">
		        <label className="tl db fw4 lh-copy f6" htmlFor="password">Password</label>
		        <input onChange={this.onPasswordChange} className="br2 b pa2 input-reset ba bg-transparent w-100" type="password" name="password"  id="password"/>
		      </div>

		    </fieldset>
		    <div className="mt3">
		    <input onClick={this.onSignUpClick} className="br2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Sign Up"/>
		    </div>
		  </div>
		</div>

			);
	}

	onNameChange = (event) =>{
		this.setState({name: event.target.value});
	}

	onEmailChange = (event) =>{
		this.setState({email: event.target.value});
	}

	onPasswordChange = (event) =>{
		this.setState({password: event.target.value});
	}

	onSignUpClick = (event) =>{
		fetch('http://localhost:3000/signup', 
	    	{ 
		    	method: 'post', 
		    	headers: {'Content-Type': 'application/json' },
		    	body: JSON.stringify({email: this.state.email, password: this.state.password, name: this.state.name}) 
		    }
	    )
	    .then(response => response.json())
	    .then(status => {
	    	if(status === 'user added')
	    		this.props.route('/signin');
	    	else
	    		alert('Try Again');
	    });
	}
}

export default SignUp;