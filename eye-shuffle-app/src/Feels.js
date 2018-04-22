import React, { Component } from 'react';
import Emoji from './Emoji';
import './Feels.css';
import makeChart from './timeline';

const EMOTIONS = ['happiness', 'anger', 'contempt', 'digust', 'fear', 'neutral', 'sadness', 'surprise'];
const EMOJIS = {
  'happiness': '😀',
  'anger': '😠',
  'contempt': '🙄',
  'digust': '🤮',
  'fear': '😱',
  'neutral': '😐',
  'sadness': '😟',
  'surprise': '😯'
};

class Feels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      happiness: undefined,
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
    const children = this.props.children;
    const mappedChildren = React.Children.map(children, child => {
      return React.cloneElement(child, { 
        happiness: this.state.happiness
      });
    });

    let index = 0;

    const emojis = EMOTIONS.map(emotion => {
      const emoji = <Emoji index={index.toString()} emoji={EMOJIS[emotion]} value={this.state[emotion]} />

      return emoji
    });

    const dict = {};
    dict["float"] = "left";

    return <div>
      <div id='stream-shadow'>
        <video id='stream' width='640' height='480'></video>
      </div>
      <canvas id='canvas' width='640' height='480'></canvas>

      <div id='emojis'>
        {emojis}
      </div>

      <div id="chart_div"></div>


      <button style={dict} onClick={makeChart}>Draw</button>
    </div>
  }

  createWebRTCFeed() {
    const video = this.state.video;

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        video.srcObject = stream;
        video.play();

        this.startUpdateLoop();
      })
      .catch(err => console.log(`Error loading video: ${err}`));
  }

  startUpdateLoop() {
    this.updateEmotions();
  }

  getImageData() {
    return new Promise((resolve, reject) => {
      // TODO: get binary data from web cam
      const width = this.state.video.videoWidth;
      const height = this.state.video.videoHeight;

      const context = this.state.canvas.getContext('2d');
      context.drawImage(this.state.video, 0, 0, 640, 480);

      //return this.state.canvas.toBlob(res => resolve(res));
      resolve(this.state.canvas.toDataURL());
    });
  }

  updateEmotions() {

    this.getImageData()
      .then(res => {
        setTimeout(() => this.updateEmotions(), 500);

        /* Call server endpoint -> which calls azure api -> get response back */
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/emotion', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = (e) => {
          try {
            if (xhr.readyState === 4 && xhr.status === 200) {
              const res = JSON.parse(xhr.responseText);

              this.setState(res);
            }
          } catch(err) {
            console.log(err);
          }
        };
        xhr.send(JSON.stringify({image_data: res, test: "test"}));
      });
  }
}

export default Feels;
