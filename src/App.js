import React, { Component } from 'react';
import './App.css';
import 'tachyons';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageInputBox from './components/ImageInputBox/ImageInputBox';
import ImageDisplay from './components/ImageDisplay/ImageDisplay';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';

const initialState = {
                  imageUrl: '',
                  input: '',
                  regions: [],
                  route: '/signin',
                  signedInId: ''
                };

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  setRoute = (route) => {
    if(route === '/signout'){
       this.setState(initialState);
       return;
    }else{
      this.setState({route: route});
    }
  }

  render() {

    if(this.state.route === '/home'){
      return (
        <div className="App">
          <Navigation isSignedIn={true} route={this.setRoute} />
          <Logo />
          <ImageInputBox onTextInput={this.onTextInput} onBtnClick={this.onDetectBtnClick} signedInId={this.state.signedInId}/> 
          <ImageDisplay imageUrl={this.state.imageUrl} regions={this.state.regions}/>
        </div>
      );  
    }else if(this.state.route === '/signin'){
      return (
        <div className="App">
          <Navigation isSignedIn={false} route={this.setRoute} />
          <SignIn route={this.setRoute} setID={this.setSignedInId}/>
        </div>
      );
    }else if(this.state.route === '/signup'){
      return (
        <div className="App">
          <Navigation isSignedIn={false} route={this.setRoute} />
          <SignUp route={this.setRoute} />
        </div>
      );
    }

    
  }

  setSignedInId = (ident) => {
    this.setState({signedInId: ident});
  }

  onTextInput = (event) => {
   // console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onDetectBtnClick = (event) => {
    console.log('Click Detected');
    this.setState({imageUrl: this.state.input});
    this.processRegions(this.state.input);
    this.incrementEntries(this.state.signedInId);
  }

  incrementEntries = (id) => {
    const url = 'https://gentle-peak-39635.herokuapp.com/image/submit/' + id; 
    fetch(url, { 
          method: 'put', 
          headers: {'Content-Type': 'application/json' },
       
        }
    )
     .then(response => response.json())
     .then(data => {
      
      });
  }

  processRegions=(url)=>{
    let imageUrl = url.trim();
    console.log('execution of processREGIONS IN ImageDisplay');
    console.log('url passed in as props === ' + imageUrl);

    fetch('https://gentle-peak-39635.herokuapp.com/image/process', 
        { 
          method: 'post', 
          headers: {'Content-Type': 'application/json' },
          body: JSON.stringify({url: imageUrl}) 
        }
      )
      .then(response => response.json())
      .then(regions => {
        if(regions === 'error occured'){
          alert('error occured');
        }
        else{
          this.setState({regions: regions});
        }
      });
}// end of process region


}

export default App;
