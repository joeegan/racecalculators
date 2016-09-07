import React from 'react';
import distances from './kilometre-distances';
import { isNumberKey } from './keyboard';
import {
  paceToSeconds,
  secondsToPace,
  isHoursMinsSecs
} from './util/time';

function calculateIntialDistances(distances, initialMilePace) {
  const paceSecondsPerK = paceToSeconds(initialMilePace) / distances.mile;
  return Object.keys(distances).map((distance) => {
    return {
      name: distance,
      distance: distances[distance],
      pace: secondsToPace(paceSecondsPerK * distances[distance])
    };
  });
}

const Row = React.createClass({
  getInitialState: function() {
    return {
      distance: this.props.data.distance,
    };
  },
  handleChange: function(ev) {
    if (isHoursMinsSecs(ev.target.value) && isNumberKey(ev.which)) {
      // this.setState({value: ev.target.value});
    }
  },
  render: function() {
    const distance = this.props.data;
    return (
      <tr key={distance.name}>
        <td>{distance.name}</td>
        <td>
          <input id={distance.name}
                 data-k='{distance.distance}'
                 defaultValue={distance.pace}
                 onChange={this.handleChange}>
          </input></td>
      </tr>
    )
  }
});

const App = React.createClass({
  getInitialState: function() {
    return {
      distances: calculateIntialDistances(distances, '00:06:38')
    }
  },
  render: function() {
    const form = this.state.distances.map((distance) => {
      return (
        <Row data={distance} key={distance.name} />
      );
    });
    return (
      <div className='wrap'>
        <select>
          <option value='SAME'>same</option>
          <option value='PROJECTED'>projected</option>
        </select>
        <table>
          <tbody>
            {form}
          </tbody>
        </table>
      </div>
    );
  }
});

export default App;
