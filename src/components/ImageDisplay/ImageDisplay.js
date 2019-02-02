import React, { Component } from 'react';
import './ImageDisplay.css'



// initialize with your api key. This will also work in your browser via http://browserify.org/

//            https://samples.clarifai.com/face-det.jpg



class ImageDisplay extends Component {
  constructor(props){
    super(props);
    this.state = { region :  {top: '15%', bottom: '15%', left: '15%', right: '15%'} };
  }
  render() {


    return (
    	
    	<div>

        <div style={{display: 'flex', justifyContent:'center'}}>

          <div className='relative' style={{width:'fit-content', height:'fit-content'}} >

            <img src={this.props.imageUrl} alt='' style={{width: '550px', height: 'auto'}} />
            {/* <div className="bounding-box" style={{top: this.props.regions.top, bottom: this.props.regions.bottom, left: this.props.regions.left,
              right: this.props.regions.right}}></div> */}
              {this.coords()}
     </div>

        </div>
        
       </div>
	    
    );
  }

  coords = () => {
    let regionArray = this.props.regions;   //array of regions
    if(regionArray.length >0){

      console.log(regionArray);
     const faceboxes = regionArray.map( 
          (region) => { 
            let id = region.id;
            let top_row = ( Number( region.region_info.bounding_box.top_row ) * 100) + '%';
            let bottom_row = ( (1 - Number( region.region_info.bounding_box.bottom_row )) * 100 ) + '%';
            let left_col = ( Number( region.region_info.bounding_box.left_col ) * 100 ) + '%';
            let right_col = (( 1 - Number( region.region_info.bounding_box.right_col )) * 100 ) + '%'; 

            return (<div className="bounding-box" key={id} style={{top: top_row, bottom: bottom_row, left: left_col,
                  right:  right_col}}></div> ); 
          }  

      ); 

     return faceboxes;
     
    }
  }



}





export default ImageDisplay;