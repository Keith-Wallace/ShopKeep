import React from 'react';
import SelectDate from './SelectDate';

const Item = React.createClass({
  changeDateAvailable(event) {
    event.preventDefault();
    console.log('button: ', event.target)
  },

  render() {
    // SET DAYS
    var daysOptions = [];
    for (var day = 1; day < 31; day++) {
      daysOptions.push(<option value={day} key={day}>{day}</option>);
    }

    var yearsOptions = [];
    for (var year = 2016; year < 2021; year++) {
      yearsOptions.push(<option value={year} key={year}>{year}</option>);
    }

    return (
      <tr>
        <td>{this.props.item.name}</td>
        <td>{this.props.item.description}</td>
        <td>$ {this.props.item.price}</td>
        <td>
          <SelectDate
            key={this.props.item.id}
          />
          <select value={this.props.item.date_available.day} name="date_available.day">
            <option value="">-- Day --</option>
            {daysOptions}
          </select>
          <select value="" name="date_available.year">
            <option value="">-- Year --</option>
            {yearsOptions}
          </select>

          <button onClick={this.changeDateAvailable}>
            update
          </button>
        </td>
        <td>{this.props.item.taxable === 'yes' ? 'yes' : 'no'}</td>
      </tr>
    );
  }

});

export default Item;