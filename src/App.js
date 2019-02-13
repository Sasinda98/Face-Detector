import React, { Component } from 'react';
import './App.css';
import 'tachyons';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageInputBox from './components/ImageInputBox/ImageInputBox';
import ImageDisplay from './components/ImageDisplay/ImageDisplay';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';

import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '2009c3c5b635434c9efb71d0d01712b1'
});



class App extends Component {
  constructor(){
    super();
    this.state = {
                  imageUrl: '',
                  input: '',
                  regions: [],
                  route: '/signin',
                  signedInId: ''
                };
  }

/*  componentDidMount(){
    fetch('http://localhost:3000')
    .then(res => res.json())
    .then(console.log);
  }
*/
  setRoute = (route) => {
    this.setState({route: route});
  }

  render() {

    if(this.state.route === '/home'){
      return (
        <div className="App">
          <Navigation isSignedIn={true} route={this.setRoute} />
          <Logo />
          <ImageInputBox onTextInput={this.onTextInput} onBtnClick={this.onDetectBtnClick}/> 
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
    const url = 'http://localhost:3000/image/submit/' + id; 
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

    if( imageUrl.length > 0){

      let results = app.models.predict("a403429f2ddf4b49b307e318f00e528b", imageUrl).then(
      function(response) {
   
      let regionArray = response.outputs[0].data.regions;

     
      return regionArray;

      },
      function(err) {
        // there was an error
      }
    ). then( (regions) => {
          this.setState({regions: regions});
    });
       
    }
}// end of process region


}

export default App;
