import React, { Component } from 'react';
import Emoji from './Emoji';
import './Feels.css';
import makeChart from './timeline';
import makeBarChart from './barchart';
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
    window.goodvibesContract = window.web3.eth.contract([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}]);
    window.goodvibes = window.goodvibesContract.at('0x586910E1AdDCb765812afaebf4b3b059e57194cB');
    // console.log(window.goodvibes);
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

      <div id="barchart_div"></div>
      <button style={dict} onClick={makeChart}>Draw</button>
      <button style={dict} onClick={makeBarChart}>Draw Bar</button> 

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
              if(res.happiness >= 0.9){
                window.goodvibes.transfer('0xd4a81079b8266f6c77e9a99bbd050f04b86cf994',window.web3.toWei(0.1,'ether'),{from: window.web3.eth.accounts[0],
              gas: 1000000},(err,result) => {
                if(err){
                  console.log(err);
                }
                });
              }
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
