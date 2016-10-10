import React, { Component, PropTypes } from 'react';
import { isHoursMinsSecs } from '../util/time';

export default class Row extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pace: props.pace,
      highlighted: false,
      invalid: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentWillReceiveProps({pace}) {
    this.setState({ pace });
  }

  handleChange({ target }) {
    const pace = target.value;
    const distance = +target.dataset.distance;
    this.setState({ pace });
    if (isHoursMinsSecs(pace)) {
      this.setState({ invalid: false });
      this.props.handlePaceChange(pace, distance);
    } else {
      this.setState({ invalid: true });
    }
  }

  handleRemove() {
    this.props.handleRemove(this.props.distance);
  }

  handleBlur() {
    this.setState({
      highlighted: false,
    });
  }

  get labelClassName() {
    let className = 'row'
    className += this.props.highlighted ? ' row--highlighted' : '';
    className += this.state.invalid ? ' row--invalid' : '';
    return className;
  }

  render() {
    return (
      <label className={this.labelClassName}>
        <button onClick={this.handleRemove}
                title="Remove">
          <span className="material-icons">
            remove_circle_outline
          </span>
        </button>
        <input
          type="text"
          value={this.state.pace}
          data-distance={this.props.distance}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        {this.props.name}
      </label>
    );
  }

}

Row.propTypes = {
  name: PropTypes.string,
  highlighted: PropTypes.bool,
  distance: PropTypes.number,
  pace: PropTypes.string,
  handlePaceChange: PropTypes.func,
  handleRemove: PropTypes.func,
};
