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

  componentWillReceiveProps(nextProps) {
    this.setState({
      pace: nextProps.pace,
    });
  }

  handleChange(ev) {
    const pace = ev.target.value;
    const distance = +ev.target.dataset.distance;
    this.setState({ pace });
    if (isHoursMinsSecs(pace)) {
      this.setState({ invalid: false });
      this.props.update(pace, distance);
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

  render() {
    let className = 'row'
    className += this.props.highlighted ? ' row--highlighted' : '';
    className += this.state.invalid ? ' row--invalid' : '';
    return (
      <label className={className}>
        <button onClick={this.handleRemove}>
          <i className="material-icons">
            remove_circle_outline
          </i>
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
  update: PropTypes.func,
};
