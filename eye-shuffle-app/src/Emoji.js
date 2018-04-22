import React, { Component } from 'react';
import './Emoji.css';

class Emoji extends Component {
  render() {
    const emojiStyle = {
      fontSize: Math.max(this.props.value * 320, 10) + 'px'
    };
    console.log('my props', this.props);
    return <div class='emoji' style={emojiStyle}>{this.props.emoji}</div>
  }
}

export default Emoji;
