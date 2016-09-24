import React, { Component, PropTypes } from 'react';
import Row from './components/row';
import Switcher from './components/switcher';
import { calculateDistances } from './util/distance';
import kilometreDistances from './util/kilometre-distances';
import i18n from './en';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      distances: props.distances,
      algoName: props.algoName,
    };
    this.update = this.update.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
  }

  update(pace, distance) {
    this.setState({
      distances: calculateDistances(pace, distance, this.state.algoName),
    });
  }

  handleSwitchChange(ev) {
    const algoName = ev.target.value;
    const kPace = this.state.distances.find(d => d.name === 'k').pace;
    this.setState({
      distances: calculateDistances(kPace, 1, algoName),
      algoName,
    });
  }

  render() {
    const form = this.state.distances.map((distance) =>
      <Row
        distance={distance.distance}
        pace={distance.pace}
        key={distance.name}
        name={i18n[distance.name]}
        update={this.update}
      />
    );
    return (
      <div className="wrap">
        <h1>
          <span>Pace</span>
          <i className="material-icons md-light">timer</i>
        </h1>
        <p>Race/training pace calculator</p>
        <table>
          <tbody>
            {form}
            <Switcher handleChange={this.handleSwitchChange} />
          </tbody>
        </table>
        <p><a href="http://github.com/joeegan/racecalculators">Source code</a></p>
      </div>
    );
  }

}

App.propTypes = {
  distances: PropTypes.array,
  algoName: PropTypes.string,
};

App.defaultProps = {
  distances: calculateDistances('00:06:38', kilometreDistances.mile, 'SAME'),
  algoName: 'SAME',
};

export default App;
