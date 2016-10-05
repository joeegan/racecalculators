import React, { Component } from 'react';
import i18n from '../i18n/en';

export default class Switcher extends Component {
  render() {
    return (
      <tr className="switcher">
        <td>
          <label>
            {i18n.SAME}
            <input type="radio" checked={this.props.algoName === "SAME"} onChange={this.props.handleChange} value="SAME" />
          </label>
          <label>
            {i18n.PROJECTED}
            <input type="radio" checked={this.props.algoName === "PROJECTED"}
              onChange={this.props.handleChange} value="PROJECTED"/>
          </label>
        </td>
      </tr>
    );
  }
}
