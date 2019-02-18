import React, { Component } from 'react';
import Message from '../Message/Message';
import './form.css'


const ImageInputBox = ({onTextInput, onBtnClick, signedInId }) => {
    return (
    	
    	<div>
    		<div className="mt3">
    			<Message signedInId={signedInId}/>
    		</div>
	      <div className="flex justify-center pa3">
	      	<div className="form pa4 br2 shadow-3 flex-wrap justify-center">
		       <input className='f3 w-70' type='text' onChange={onTextInput}/>
		       <button className='f3 w-30 bg-light-blue b--light-blue'onClick={onBtnClick} > Detect </button>
	     	</div>
	      </div>
	     </div>
	    
    );
}

export default ImageInputBox;
