import React from 'react';
import Row from './Row';
import _ from 'lodash';
import kilometreDistances from './kilometre-distances';
import {
  paceToSeconds,
  secondsToPace,
} from './util/time';

function calculateInitialDistances(distances, initialMilePace) {
  const paceSecondsPerK = paceToSeconds(initialMilePace) / distances.mile;
  return _.map(Object.keys(distances), (distance) => {
    return {
      name: distance,
      distance: distances[distance],
      pace: secondsToPace(paceSecondsPerK * distances[distance]),
    };
  });
}

function calculateDistances(pace, distance) {
  const paceSecondsPerK = paceToSeconds(pace) / distance;
  return _.map(Object.keys(kilometreDistances), (distance) => {
    return {
      name: distance,
      distance: kilometreDistances[distance],
      pace: secondsToPace(paceSecondsPerK * kilometreDistances[distance])
    };
  });
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {distances: props.distances};
  }

  updateParentState(pace, distance) {
    this.setState({distances: calculateDistances(pace, distance)});
  }

  render() {
    const form = this.state.distances.map((distance) => {
      return (
        <Row data={distance} key={distance.name} updateParentState={this.updateParentState.bind(this)} />
      );
    });
    return (
      <div className="wrap">
        <select>
          <option value="SAME">same</option>
          <option value="PROJECTED">projected</option>
        </select>
        <table><tbody>{form}</tbody></table>
      </div>
    );
  }

}

App.defaultProps = { distances: calculateInitialDistances(kilometreDistances, '00:06:38')};

export default App;
