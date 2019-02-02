import React, { Component } from 'react';
import Tilt from 'react-tilt';
import logo from './logo.png';

class Logo extends Component {
  render() {
    return (
      <div className="">
        <Tilt className="Tilt shadow-4 ml3" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
 			<div className="Tilt-inner"> <img alt='logo here' src={logo} /> </div>
		</Tilt>
      </div>
    );
  }
}

export default Logo;
