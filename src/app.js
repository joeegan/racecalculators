import React from 'react';
import Row from './components/row';
import { calculateDistances } from './util/distance';
import kilometreDistances from './util/kilometre-distances';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      distances: props.distances,
    };
    this.update = this.update.bind(this);
  }

  update(pace, distance) {
    this.setState({
      distances: calculateDistances(pace, distance),
    });
  }

  render() {
    const form = this.state.distances.map((distance) =>
      <Row
        distance={distance.distance}
        pace={distance.pace}
        key={distance.name}
        name={distance.name}
        update={this.update}
      />
    );
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

App.propTypes = {
  distances: React.PropTypes.object,
};

App.defaultProps = {
  distances: calculateDistances('00:06:38', kilometreDistances.mile)
}

export default App;
