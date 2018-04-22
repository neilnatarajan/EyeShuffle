import React, { Component } from 'react';
import './Emoji.css';

class Emoji extends Component {
  render() {
    const emojiStyle = {
      fontSize: Math.max(this.props.value * 150, 10) + 'px'
    };

    return <div class='emoji' style={emojiStyle}>{this.props.emoji}</div>
  }
}

export default Emoji;
