import React, { Component } from 'react';
import i18n from '../i18n/en';

export default class DistanceAdder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      selectedMetric: 'k',
    };
    this.showInput = this.showInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  showInput(ev) {
    ev.preventDefault();
    this.setState({
      showInput: true,
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const distance = +ev.target[0].value;
    const metric = this.state.selectedMetric;
    this.props.handleAdd(distance, metric);
  }

  handleRadioChange(ev) {
    this.setState({
      selectedMetric: ev.target.value,
    })
  }

  form() {
    const radios = ['k', 'miles'].map((metric) => {
      return (
        <label key={metric}>
          <input
            type="radio"
            checked={this.state.selectedMetric === metric}
            onChange={this.handleRadioChange}
            value={metric}
          />
          {metric}
        </label>
      );
    });
    if (this.state.showInput) {
      return (
        <form onSubmit={this.handleSubmit}>
          <input type="text" autoFocus="true" />
          {radios}
          <p className="distance-adder_hint">
            Press Enter to submit new distance
          </p>
        </form>
      )
    } else {
      return (
        <span>Add a distance</span>
      )
    }
  }

  render() {
    return (
      <label className="row distance-adder">
        <button onClick={this.showInput}>
          <i className="material-icons">
            add_circle_outline
          </i>
        </button>
        {this.form()}
      </label>
    )
  }
}
