import React, { Component } from 'react';
import i18n from '../i18n/en';

export default class Algo extends Component {

  selected() {
    return this.props.selectedAlgoName === this.props.name;
  }

  explanation() {
    return (
      <p className='explanation'>
        <span>
          {i18n[this.props.name + '_explanation']}
          <a href={i18n[this.props.name + '_url']}>
            {i18n[this.props.name + '_link']}
          </a>
        </span>
      </p>
    )
  }

  render() {
    return (
      <div>
        <label>
          {i18n[this.props.name]}
          <input
            type="radio"
            checked={this.selected()}
            onChange={this.props.handleChange}
            value={this.props.name}
          />
        </label>
        {this.explanation()}
      </div>
    )
  }
}
