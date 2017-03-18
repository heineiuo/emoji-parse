import React, {Component} from 'react'
import {emojifyText} from 'emoji-parse'
import Picker from './Picker'
import DropDown, {DropDownTrigger, DropDownContent} from 'react-sea/lib/DropDown'

const emojis = require('./emojis');

class App extends Component {

  state = {
    history: [],
    current: ''
  };

  componentDidMount = () => {
    this.setState({
      history: [
        '今天天气不错，:smile:',
      ].map(text => emojifyText(text)),
      current: ''
    })
  };
  handleInputKeyPress = (e) => {
    if (e.key == 'Enter') this.handleSubmit()
  };

  handleChange = (e) => {
    this.setState({
      current: e.target.value
    })
  };

  handleSubmit = () => {
    const {history, current} = this.state;
    this.setState({
      history: history.slice().concat([emojifyText(current)]),
      current: ''
    })
  };

  handlePickerSelect = (key) => {
    this.setState({
      current: this.state.current + `:${key}:`
    })
  };

  openPicker = () => {

  };

  render (){
    const {history, current} = this.state;
    return (
      <div>
        {
          history.map((line, index) => (
            <div key={index} style={{display: 'flex', alignItems: 'center'}}>
              {
                line.map((word, index) => {
                  if (word.type == 'emoji' ) {
                    return (
                      <img key={index} src={emojis[word.value]} alt="" style={{height: 20}}/>
                    )
                  }
                  return <span key={index}>{word.value}</span>
                })
              }
            </div>
          ))
        }
        <div style={{
          borderBottom: '1px solid #DDD',
          margin: '20px 0'
        }}></div>
        <div style={{
          display: 'flex'
        }}>
          <input
            value={current}
            type="text"
            onKeyPress={this.handleInputKeyPress}
            onChange={this.handleChange}
          />
          <DropDown ref={ref => this.dropdown = ref}>
            <DropDownTrigger >
              <img src={emojis['smile']} alt="" style={{height: 20}} onClick={this.openPicker}/>
            </DropDownTrigger>
            <DropDownContent style={{
              position: 'absolute'
            }}>
              <Picker onSelect={this.handlePickerSelect} />
            </DropDownContent>
          </DropDown>
          <button onClick={this.handleSubmit}>发送</button>
        </div>
      </div>
    )
  }
}

module.exports = App;