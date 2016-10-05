import React, { Component } from 'react';
import i18n from '../i18n/en';

export default class Switcher extends Component {
  render() {
    return (
      <tr>
        <td>
          <select className="highlighted" onChange={this.props.handleChange}>
            <option value="SAME">{i18n.SAME}</option>
            <option value="PROJECTED">{i18n.PROJECTED}</option>
          </select>
        </td>
        <td>{i18n.pace}</td>
      </tr>
    );
  }
}
