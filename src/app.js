import React, { Component, PropTypes } from 'react';
import Row from './components/row';
import Algo from './components/algo';
import { calculateDistances } from './util/distance';
import kilometreDistances from './util/kilometre-distances';
import i18n from './i18n/en';

class App extends Component {

  constructor(props: object) {
    super(props);
    this.state = {
      distances: props.distances,
      selectedAlgoName: props.selectedAlgoName,
      calculatedDistance: props.calculatedDistance,
      animateToggle: false,
      algos: ['SAME', 'PROJECTED']
    };
    this.update = this.update.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  update(pace: string, distance: number) {
    this.setState({
      distances: calculateDistances(pace, distance, this.state.selectedAlgoName),
      calculatedDistance: distance,
      animateToggle: !this.state.animateToggle,
    });
  }

  handleSwitchChange(ev: object) {
    const selectedAlgoName = ev.target.value;
    const pace = this.state.distances.find((d) => {
      return d.distance === this.state.calculatedDistance;
    }).pace;
    this.setState({
      distances: calculateDistances(pace, this.state.calculatedDistance, selectedAlgoName),
      selectedAlgoName,
    });
  }

  handleRemove(distance: number) {
    this.setState({
      distances: this.state.distances.filter(d => {
        return d.distance !== distance;
      })
    });
  }

  render() {
    const distances = this.state.distances.map(distance =>
      <Row
        distance={distance.distance}
        pace={distance.pace}
        key={distance.name}
        name={i18n[distance.name]}
        update={this.update}
        handleRemove={this.handleRemove}
        highlighted={this.state.calculatedDistance === distance.distance}
      />
    );
    const algos = this.state.algos.map(algo =>
      <Algo
        selectedAlgoName={this.state.selectedAlgoName}
        key={algo}
        name={algo}
        handleChange={this.handleSwitchChange}
      />
    );
    let animationClass = 'stopwatch_second';
    animationClass += this.state.animateToggle ? ' stopwatch_second--animate0' : ' stopwatch_second--animate1';
    return (
      <div className="wrap">
        <h1>Pace</h1>
        <div className="stopwatch">
          <div className="stopwatch_top"></div>
          <div className="stopwatch_right"></div>
          <div className="stopwatch_arc">
            <div className={animationClass}></div>
          </div>
        </div>
        <div className="switcher">{algos}</div>
        <form>{distances}</form>
        <a href={i18n['source_code_url']}>
          {i18n['source_code']}
        </a>
      </div>
    );
  }

}

App.propTypes = {
  distances: PropTypes.array,
  selectedAlgoName: PropTypes.string,
  calculatedDistance: PropTypes.number,
};

App.defaultProps = {
  calculatedDistance: kilometreDistances.mile,
  distances: calculateDistances('00:06:38', kilometreDistances.mile, 'SAME'),
  selectedAlgoName: 'SAME',
};

export default App;
