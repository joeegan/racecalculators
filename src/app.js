import React from 'react';
import Row from './components/row';
import { calculateDistances } from './util/distance';
import kilometreDistances from './util/kilometre-distances';
import i18n from './en';

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
            <tr>
              <td>
                <select>
                  <option value="SAME">same</option>
                  <option value="PROJECTED">projected</option>
                </select>
              </td>
              <td>Method</td>
            </tr>
          </tbody>
        </table>
        <p><a href="http://github.com/joeegan/racecalculators">Source code</a></p>
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
