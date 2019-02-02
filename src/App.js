import React, { Component } from 'react';
import './App.css';
import 'tachyons'

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageInputBox from './components/ImageInputBox/ImageInputBox';
import ImageDisplay from './components/ImageDisplay/ImageDisplay';

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
                  regions: [] 
                };
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <ImageInputBox onTextInput={this.onTextInput} onBtnClick={this.onDetectBtnClick}/> 
        <ImageDisplay imageUrl={this.state.imageUrl} regions={this.state.regions}/>
      </div>
    );
  }


  onTextInput = (event) => {
   // console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onDetectBtnClick = (event) => {
    console.log('Click Detected');
    this.setState({imageUrl: this.state.input});
    this.processRegions(this.state.input);
    
  }

  processRegions=(url)=>{
    let imageUrl = url.trim();
    console.log('execution of processREGIONS IN ImageDisplay');
    console.log('url passed in as props === ' + imageUrl);

    if( imageUrl.length > 0){

      let results = app.models.predict("a403429f2ddf4b49b307e318f00e528b", imageUrl).then(
      function(response) {
        // do something with response
       /*console.log(response.outputs[0]);*/
      let regionArray = response.outputs[0].data.regions;
     // console.log(regionArr);

/*     let top_row = ( Number( regionArray[0].region_info.bounding_box.top_row ) * 100) + '%';
     let bottom_row = ( (1 - Number( regionArray[0].region_info.bounding_box.bottom_row )) * 100 ) + '%';
     let left_col = ( Number( regionArray[0].region_info.bounding_box.left_col ) * 100 ) + '%';
     let right_col = (( 1 - Number( regionArray[0].region_info.bounding_box.right_col )) * 100 ) + '%'; 

      console.log(top_row );
      console.log(bottom_row );
      console.log(left_col );
      console.log(right_col );*/
      
     
      return regionArray;

      },
      function(err) {
        // there was an error
      }
    ). then( (regions) => {
          this.setState({regions: regions});
          //console.log(regions);
          //console.log('HELLO FRO<<');
    });
       
    }
}// end of process region


}

export default App;
