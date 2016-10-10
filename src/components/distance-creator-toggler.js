import React, { Component } from 'react';
import DistanceCreator from './distance-creator';
import i18n from '../i18n/en';

export default class DistanceCreatorToggler extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
    };
    this.handleShowForm = this.handleShowForm.bind(this);
  }

  handleShowForm(ev) {
    ev.preventDefault();
    this.setState({
      showInput: true,
    });
  }

  get creator() {
    if (this.state.showInput) {
      return (
        <DistanceCreator
          handleAdd={this.props.handleAdd}
        />
      )
    }
    return <span>Add a distance</span>
  }

  render() {
    return (
      <label className="row distance-adder">
        <button onClick={this.handleShowForm}>
          <i className="material-icons">
            add_circle_outline
          </i>
        </button>
        {this.creator}
      </label>
    )
  }
}
