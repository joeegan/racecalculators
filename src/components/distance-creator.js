import React, { Component, PropTypes } from 'react';
import i18n from '../i18n/en';

export default class DistanceCreator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedMetric: 'k',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  handleSubmit({ target }) {
    ev.preventDefault();
    const distance = +target[0].value;
    const metric = this.state.selectedMetric;
    this.props.handleAdd(distance, metric);
  }

  handleRadioChange({ target }) {
    this.setState({
      selectedMetric: target.value,
    })
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
      <form onSubmit={this.handleSubmit}>
        <input type='text' autoFocus='true' />
        {this.radios}
        <p className='distance-adder_hint'>
          Press Enter to submit new distance
        </p>
      </form>
    )
  }

}

DistanceCreator.propTypes = {
  handleAdd: PropTypes.func,
};
