import React, { Component, PropTypes } from 'react';
import { isHoursMinsSecs } from '../util/time';

export default class Row extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pace: props.pace,
      highlighted: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pace: nextProps.pace,
    });
  }

  handleChange(ev) {
    const pace = ev.target.value;
    const distance = +ev.target.dataset.distance;
    this.setState({ pace, highlighted: true });
    if (isHoursMinsSecs(pace)) {
      this.props.update(pace, distance);
    }
  }

  render() {
    return (
      <tr>
        <td>
          <input
            value={this.state.pace}
            data-distance={this.props.distance}
            onChange={this.handleChange}
            className={this.props.highlighted ? 'highlighted' : ''}
          />
        </td>
        <td>{this.props.name}</td>
      </tr>
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
