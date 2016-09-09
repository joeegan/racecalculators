import 'React' from 'react';

export defult class Row extends React.Component {

  getInitialState() {
    return {
      distance: this.props.data.distance,
    };
  },

  handleChange(ev) {
    if (isHoursMinsSecs(ev.target.value) && isNumberKey(ev.which)) {
      // this.setState({value: ev.target.value});
      this.updateParentState(ev.target.value, this.props.data.distance);
    }
  },

  render() {
    const { name, pace } = this.props.data;
    return (
      <tr key={name}>
        <td>{name}</td>
        <td>
          <input id={name}
                 data-k='{distance.distance}'
                 value={pace}
                 onChange={this.handleChange}>
          </input></td>
      </tr>
    )
  }

}
