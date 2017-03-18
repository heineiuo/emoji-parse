import React, {Component} from 'react'
import {emojifyText} from 'emoji-parse'

const emojis = require('./emojis');

class Picker extends Component {

  static defaultProps = {
    onSelect: () => {},
  };

  handleClick = (key) => {
    this.props.onSelect(key)
  };

  render (){
    return (
      <div style={{
        width: 200,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        height: 240,
        border: '1px solid #EEE',
        overflow: 'auto'
      }}>
        {
          Object.keys(emojis).map(key => (
            <img
              key={key}
              src={emojis[key]}
              alt={key}
              onClick={() => this.handleClick(key)}
              style={{width: 20, height: 20, margin: 2}}
            />
          ))
        }
      </div>
    )
  }
}

export default module.exports = Picker;