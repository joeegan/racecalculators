import React, { Component, PropTypes } from 'react';
import DistanceCreator from './distance-creator';
import i18n from '../i18n/en';

export default class DistanceCreatorToggler extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
    };
    this.handleFormToggle = this.handleFormToggle.bind(this);
  }

  handleFormToggle(ev) {
    ev.preventDefault();
    this.setState({
      showInput: !this.state.showInput,
    });
  }

  get creator() {
    if (this.state.showInput) {
      return (
        <DistanceCreator
          handleAdd={this.props.handleAdd}
          distanceMap={this.props.distanceMap}
        />
      )
    }
    return <span>Add a distance</span>
  }

  get toggleIcon() {
    if (this.state.showInput) {
      return 'remove_circle_outline';
    }
    return 'add_circle_outline';
  }

  render() {
    return (
      <label className='row distance-adder'>
        <button onClick={this.handleFormToggle}>
          <i className='material-icons'>
            {this.toggleIcon}
          </i>
        </button>
        {this.creator}
      </label>
    )
  }
}

DistanceCreatorToggler.propTypes = {
  handleAdd: PropTypes.func,
};
