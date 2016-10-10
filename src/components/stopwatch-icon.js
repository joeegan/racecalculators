import React, { Component } from 'react';
import i18n from '../i18n/en';

export default class StopwatchIcon extends Component {

  get animationClass() {
    let className = 'stopwatch_second stopwatch_second--animate';
    return className += this.props.toggled ? '0' : '1';
  }

  render() {
    return (
      <div className="stopwatch">
        <div className="stopwatch_top"></div>
        <div className="stopwatch_right"></div>
        <div className="stopwatch_arc">
          <div className={this.animationClass}></div>
        </div>
      </div>
    )
  }

}
