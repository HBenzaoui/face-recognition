import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImagelinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
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
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'SignIn',
      isSignIn: false
    }
  }

  
  calculateFaceDetection = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }


  onBtnSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceDetection(response)))
      .catch(error => console.log(error));
  }


  onRouteChange = (route) =>{
    if(route === 'singout'){
      this.setState({isSignIn: false})
    } else if(route === 'home'){
      this.setState({isSignIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignIn={isSignIn} onRouteChange={this.onRouteChange}/>
        {route === 'home' 
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onBtnSubmit={this.onBtnSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div> 
          : (
            route === 'SignIn'
            ? <SignIn onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange}/>
          )
          
        }
      </div>
    );
  }
}

export default App;
