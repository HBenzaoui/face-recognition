import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImagelinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';

import './App.css';

const app = new Clarifai.App({
  apiKey: '9ee01e84d3c14779a474c498a212fe31'
});

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
} 
class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) =>{
    console.log(event.target.value);
  }


  onBtnSubmit = () =>{
    console.log('click');
    app.models.predict(
        "a403429f2ddf4b49b307e318f00e528b",
        "https://samples.clarifai.com/face-det.jpg")
      .then(
      function(response) {
        console.log(response)
      },
      function(err) {
        // there was an error
      }
  );
  }


  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange}
          onBtnSubmit={this.onBtnSubmit}
          />
        <FaceRecognition /> 
      </div>
    );
  }
}

export default App;
