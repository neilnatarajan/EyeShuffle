import React, { Component } from 'react';

class Feels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emotions: { }
    };
  }

  componentDidMount() {
    this.createWebRTCFeed();
  }

  render() {
    {props.children}
  }


  createWebRTCFeed() {
    // Initialize web cam
  }

  startUpdateLoop() {
    setInterval(() => this.updateEmotions(), 1000);
  }

  getImageData() {
    // TODO: get binary data from web cam
  }

  updateEmotions() {
    // TODO: Get emotions from the current image data and update the
    // emotions state.
  }
}