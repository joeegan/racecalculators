import React, { Component, PropTypes } from 'react';
import Row from './components/row';
import Algo from './components/algo';
import DistanceCreatorToggler from './components/distance-creator-toggler';
import StopwatchIcon from './components/stopwatch-icon';
import { calculateDistances, milesToK } from './util/distance';
import kilometreDistances from './util/kilometre-distances';
import i18n from './i18n/en';
import _ from 'lodash';

class App extends Component {

  constructor(props: object) {
    super(props);
    this.state = {
      distances: props.distances,
      selectedAlgoName: props.selectedAlgoName,
      calculatedDistance: props.calculatedDistance, // e.g 5
      distanceMap: props.distanceMap,
      animateToggle: false,
      error: null,
    };
    this.handlePaceChange = this.handlePaceChange.bind(this);
    this.handleAlgoChange = this.handleAlgoChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handlePaceChange(pace: string, distance: number) {
    this.setState({
      distances: calculateDistances(pace, distance, this.state.selectedAlgoName, this.state.distanceMap),
      calculatedDistance: distance,
      animateToggle: !this.state.animateToggle,
    });
  }

  handleAlgoChange({ target: { value: selectedAlgoName }}: string) {
    const distances = calculateDistances(
      this.currentDistance.pace,
      this.state.calculatedDistance,
      selectedAlgoName,
      this.state.distanceMap
    );
    this.setState({
      distances,
      selectedAlgoName,
    });
  }

  handleRemove(distance: number) {
    const distanceMap = this.state.distanceMap;
    for (let d in distanceMap) {
      if (distanceMap[d] == distance) {
        delete distanceMap[d];
      }
    }
    this.setState({
      distances: this.state.distances.filter(d => {
        return d.distance !== distance;
      }),
      distanceMap,
    });
  }

  handleAdd(distance: number, metric: string, key: string) {
    const distanceMap = Object.assign({
      [key]: metric === 'k' ? distance : milesToK(distance),
    }, this.distanceMap);
    this.setState({
      distanceMap,
      distances: calculateDistances(
        this.state.distances.find(d => d.distance === this.state.calculatedDistance).pace,
        this.state.calculatedDistance,
        this.state.selectedAlgoName,
        distanceMap
      ),
    });
  }

  get algos() {
    return ['SAME', 'PROJECTED'].map(algo =>
      <Algo
        selectedAlgoName={this.state.selectedAlgoName}
        key={algo}
        name={algo}
        handleChange={this.handleAlgoChange}
      />
    );
  }

  // The highlighted distance object
  get currentDistance() {
    return this.state.distances.find(d => {
      return d.distance === this.state.calculatedDistance;
    }) || this.state.distances[0];
  }

  get rows() {
    return this.state.distances.map(distance => {
      const name = i18n[distance.name] || distance.name;
      return (
        <Row
          distance={distance.distance}
          pace={distance.pace}
          key={name}
          name={name}
          handlePaceChange={this.handlePaceChange}
          handleRemove={this.handleRemove}
          highlighted={this.state.calculatedDistance === distance.distance}
        />
      );
    });
  }

  get distanceMap() {
    return this.state.distances.reduce((acc, d) => {
      acc[d.name] = d.distance;
      return acc;
    }, {});
  }

  render() {
    return (
      <div className="wrap">
        <h1>Pace</h1>
        <StopwatchIcon toggled={this.state.animateToggle} />
        <div className="switcher">{this.algos}</div>
        <form>{this.rows}</form>
        <DistanceCreatorToggler
          distanceMap={this.state.distanceMap}
          handleAdd={this.handleAdd}
          handleShowCreator={this.handleShowCreator}
        />
      </div>
    );
  }

}

App.propTypes = {
  distances: PropTypes.array,
  selectedAlgoName: PropTypes.string,
  calculatedDistance: PropTypes.number,
  distanceMap: PropTypes.object,
};

App.defaultProps = {
  calculatedDistance: kilometreDistances['1miles'],
  distanceMap: kilometreDistances,
  distances: calculateDistances('00:06:38', kilometreDistances['1miles'], 'SAME'),
  selectedAlgoName: 'SAME',
};

export default App;
