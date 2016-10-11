import React, { Component, PropTypes } from 'react';
import i18n from '../i18n/en';

export default class DistanceCreator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      typed: null,
      selectedMetric: 'k',
      error: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleDistanceType = this.handleDistanceType.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const distance = +ev.target[0].value;
    const metric = this.state.selectedMetric;
    const key = `${distance}${metric}`;
    if (this.state.error) {
      return;
    }
    this.setState({
      typed: null,
    })
    this.props.handleAdd(distance, metric, key);
  }

  handleRadioChange({ target }) {
    this.setState({
      selectedMetric: target.value,
    });
  }

  handleDistanceType({ target: { value } }) {
    const typed = +value;
    const key = `${typed}${this.state.selectedMetric}`;
    let error = null;
    if (this.props.distanceMap.hasOwnProperty(key)) {
      error = 'This distance already exists';
    } else if (typed.toString() === "NaN") {
      error = 'Enter a valid number';
    }
    this.setState({
      typed,
      error,
    });
  }

  get className() {
    if (this.state.error) {
      return 'row--invalid';
    }
  }

  get radios() {
    return ['k', 'miles'].map(metric => {
      return (
        <label key={metric}>
          <input
            type='radio'
            checked={this.state.selectedMetric === metric}
            onChange={this.handleRadioChange}
            value={metric}
          />
          {metric}
        </label>
      );
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={this.className}>
        <input
          type='text'
          autoFocus='true'
          onChange={this.handleDistanceType}
        />
        {this.radios}
        <p className='distance-adder_hint'>
          {this.state.error || 'Press Enter to submit new distance'}
        </p>
      </form>
    );
  }

}

DistanceCreator.propTypes = {
  handleAdd: PropTypes.func,
  distanceMap: PropTypes.object,
};
