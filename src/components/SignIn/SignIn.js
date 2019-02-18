import React, { Component } from 'react';

class SignIn extends Component{
	constructor(props){
		super(props);
		this.state = {email: '', password: ''};
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value});
	}


	onPasswordChange = (event) => {
		this.setState({password: event.target.value});
	}

	onSubmitSignIn = () => {
		console.log(this.state);

	    fetch('https://gentle-peak-39635.herokuapp.com/signin', 
	    	{ 
		    	method: 'post', 
		    	headers: {'Content-Type': 'application/json' },
		    	body: JSON.stringify({email: this.state.email, password: this.state.password}) 
		    }
	    )
	    .then(res => res.json())
	    .then(status => {
	    	if(status.loginStatus === 'successful'){
	    		this.props.setID(status.ident);
	    		console.log(status.ident);
	    		this.props.route('/home');
	    	}
	    	else{
	    		alert('Invalid Credentials');
	    	}
	    });

	    //this.props.route('/')

	}

	render(){
		return(
		<div className="pa4 br2 ba dark-gray b--black-10 mv4 w-80  mw6 center shadow-5" style={{marginTop:'10%'}} >
		  <div>
		    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
		      <h2 className="f1 ma1">Sign In</h2>
		      <div className="mt3">
		        <label className="tl db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
		        <input onChange={this.onEmailChange} className="br2 pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address"  id="email-address"/>
		      </div>
		      <div className="mt3">
		        <label className="tl db fw4 lh-copy f6" htmlFor="password">Password</label>
		        <input onChange={this.onPasswordChange} className="br2 b pa2 input-reset ba bg-transparent w-100" type="password" name="password"  id="password"/>
		      </div>

		    </fieldset>
		    <div className="mt3"><input className="br2" onClick={this.onSubmitSignIn} className="br2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Sign In"/></div>
		  </div>
		</div>

			);
	}
}

export default SignIn;