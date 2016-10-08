import React, { Component } from 'react';
import i18n from '../i18n/en';

export default class DistanceAdder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      checked: "K",
    };
    this.showInput = this.showInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showInput(ev) {
    ev.preventDefault();
    this.setState({
      showInput: true,
    });
  }

  handleSubmit(ev) {
    debugger;
  }

  form() {
    if (this.state.showInput) {
      return (
        <div>
          <input type="text" />
          <label>
            <input type="radio" checked={this.state.checked === "K"} />
            K
          </label>
          <label>
            <input type="radio" checked={this.state.checked === "Miles"}/>
            Miles
          </label>
          <button onClick={this.handleSubmit}>
            <i className="material-icons">
              add_circle
            </i>
            Add a distance
          </button>
        </div>
      )
    }
  }

  render() {
    return (
      <label className="row">
        <button onClick={this.showInput}>
          <i className="material-icons">
            add_circle_outline
          </i>
          Add a distance
        </button>
        {this.form()}
      </label>
    )
  }
}
