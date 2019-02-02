import React, { Component } from 'react';

class Navigation extends Component {
  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p className='f4 pa2 mr3 pointer link dim underline'>Sign Out</p>
      </div>
    );
  }
}

export default Navigation;
