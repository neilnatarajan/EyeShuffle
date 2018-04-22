import React, { Component } from 'react';
import './Feels.css';

class Feels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emotions: { },
      video: undefined,
      canvas: undefined
    };
  }

  componentDidMount() {
    this.setState({
      video: document.getElementById('stream'),
      canvas: document.getElementById('canvas')
    }, () => this.createWebRTCFeed());
  }

  render() {
    return <div>
      <video id='stream' width='640' height='480'></video>
      <canvas id='canvas' width='640' height='480'></canvas>
    </div>
  }

  createWebRTCFeed() {
    const video = this.state.video;

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        console.log(stream);
        video.srcObject = stream;
        video.play();

        this.startUpdateLoop();
      })
      .catch(err => console.log(`Error loading video: ${err}`));
  }

  startUpdateLoop() {
    console.log(1);
    this.updateEmotions();
  }

  getImageData() {
    return new Promise((resolve, reject) => {
      // TODO: get binary data from web cam
      const width = this.state.video.videoWidth;
      const height = this.state.video.videoHeight;

      const context = this.state.canvas.getContext('2d');
      context.drawImage(this.state.video, 0, 0, 640, 480);

      return this.state.canvas.toBlob(res => resolve(res));
    });
  }

  updateEmotions() {
    this.getImageData()
      .then(res => {
        const reader = new FileReader();
        reader.onload = function(e) {
          const a = new Uint8Array(this.result);
          console.log(a);
        }
        reader.readAsArrayBuffer(res);

        setTimeout(() => this.updateEmotions(), 1000);
        /* Call server endpoint -> which calls azure api -> get response back */
        /*
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/emotion', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function(e) {
          if (xhr.readyState == 4 && xhr.status == 200) {
            //const res = JSON.parse(xhr.responseText);
            //console.log(res);
            console.log("GOOD");
          }
        };
        xhr.send(JSON.stringify({image_data: res}));
        */

      });
  }
}

export default Feels;
