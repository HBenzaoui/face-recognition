import React from 'react';
import Tilt from 'react-tilt';
import brainPic from './brain.png';
import './Logo.css';

const Logo = () =>{
    return(
    <div className='ma4 mt0'>
    <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 110, width: 110 }} >
    <div className="Tilt-inner pa3"> <img style={{paddingTop: '5px'}} alt='Logo' src={brainPic}/> </div>
    </Tilt>
    </div>
    )
}

export default Logo;