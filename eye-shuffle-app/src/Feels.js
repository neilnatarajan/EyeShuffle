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
      <video id='stream'></video>
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
	// TODO: Get emotions from the current image data and update the
    // **********************************************
    // *** Update or verify the following values. ***
    // **********************************************
   	var request = require('request');


    // Replace the subscriptionKey string value with your valid subscription key.
    var subscriptionKey = "fd65229578bd4f45948951f483544b61";

    // Replace or verify the region.
    //
    // You must use the same region in your REST API call as you used to obtain your subscription keys.
    // For example, if you obtained your subscription keys from the westus region, replace
    // "westcentralus" in the URI below with "westus".
    //
    // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
    // a free trial subscription key, you should not need to change this region.
    var url = "https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=emotion";

    // Request parameters.

    request.post({
      'url' : url,
      //'headers' : { 'Content-Type' : 'application/octet-stream', 'Ocp-Apim-Subscription-Key' : subscriptionKey}, 
      //'body' : data, 
      'headers' : { 'Content-Type' : 'application/json'},
      'body' { 'url' : 'http://images4.fanpop.com/image/photos/22700000/http-www-google-com-imgres-imgurl-http-upload-thegioihoathinh-com-images-278889prison_break11-jp-prison-break-22733317-375-500.jpg'}


    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body)
        }
      }
    );
   
	}
}
    // TODO: Get emotions from the current image data and update the
    // emotions state.
    this.getImageData()
      .then(res => {
        const reader = new FileReader();
        reader.onload = function(e) {
          const a = new Uint8Array(this.result);
          console.log(a);
        }
        reader.readAsArrayBuffer(res);
      });
  }
}

export default Feels;
