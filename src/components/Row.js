import React from 'react';
import { isHoursMinsSecs } from '../util/time';
import { kebabCase } from 'lodash';

export default class Row extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pace: props.pace,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pace: nextProps.pace,
    });
  }

  handleChange(ev) {
    const pace = ev.target.value;
    const distance = ev.target.dataset.distance;
    this.setState({ pace });
    if (isHoursMinsSecs(pace)) {
      this.props.update(pace, distance);
    }
  }

  render() {
    return (
      <tr>
        <td>{kebabCase(this.props.name)}</td>
        <td>
          <input
            value={this.state.pace}
            data-distance={this.props.distance}
            onChange={this.handleChange.bind(this)}
          >
          </input></td>
      </tr>
    );
  }

}

Row.propTypes = {
  name: React.PropTypes.string,
  distance: React.PropTypes.string,
  pace: React.PropTypes.string,
  update: React.PropTypes.function,
  handleChange: React.PropTypes.function,
};
