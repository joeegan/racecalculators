import React, { Component, PropTypes } from 'react';
import i18n from '../i18n/en';

export default class Algo extends Component {

  get selected() {
    return this.props.selectedAlgoName === this.props.name;
  }

  get explanation() {
    return i18n[`${this.props.name}_explanation`];
  }

  get linkUrl() {
    return i18n[`${this.props.name}_url`];
  }

  get linkText() {
    return i18n[`${this.props.name}_link`];
  }

  render() {
    return (
      <div>
        <label>
          {i18n[this.props.name]}
          <input
            type="radio"
            checked={this.selected}
            onChange={this.props.handleChange}
            value={this.props.name}
          />
        </label>
        <p className='explanation'>
          <span>
            {this.explanation}
            <a href={this.linkUrl}>
              {this.linkText}
            </a>
          </span>
        </p>
      </div>
    )
  }
}

Algo.propTypes = {
  name: PropTypes.string,
  selectedAlgoName: PropTypes.string,
  handleChange: PropTypes.func,
};
