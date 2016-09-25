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
      highlightedDistance: props.highlightedDistance,
    };
    this.update = this.update.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
  }

  update(pace, distance) {
    this.setState({
      distances: calculateDistances(pace, distance, this.state.algoName),
      highlightedDistance: distance,
    });
  }

  handleSwitchChange(ev) {
    const algoName = ev.target.value;
    const pace = this.state.distances.find(d => {
      return d.distance === this.state.highlightedDistance;
    }).pace;
    this.setState({
      distances: calculateDistances(pace, this.state.highlightedDistance, algoName),
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
        highlighted={this.state.highlightedDistance === distance.distance}
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
        <p className="explanation">{i18n[this.state.algoName]}</p>
        <p><a href="http://github.com/joeegan/pace">Source code</a></p>
      </div>
    );
  }

}

App.propTypes = {
  distances: PropTypes.array,
  algoName: PropTypes.string,
  highlightedDistance: PropTypes.number,
};

App.defaultProps = {
  highlightedDistance: kilometreDistances.mile,
  distances: calculateDistances('00:06:38', kilometreDistances.mile, 'SAME'),
  algoName: 'SAME',
};

export default App;
