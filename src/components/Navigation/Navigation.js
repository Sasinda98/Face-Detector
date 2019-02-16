import React, { Component } from 'react';

class Navigation extends Component {
  render() {

  	if(this.props.isSignedIn === true){
	    return (
	      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
	        <p className='f4 pa2 mr3 pointer link dim underline'  onClick={()=>this.props.route('/signout')} >Sign Out</p>
	      </div>
	    );
    }else{
    	return (
	      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
	        <p onClick={()=>this.props.route('/signin')} className='f4 pa2 mr3 pointer link dim underline'>Sign In</p>
	        <p onClick={()=>this.props.route('/signup')} className='f4 pa2 mr3 pointer link dim underline'>Register</p>
	      </div>
	    );
    }
  }
}

export default Navigation;
