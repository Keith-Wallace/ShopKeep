import React from 'react';
import {monthSelect} from '../data/dateSelect'

const SelectDate = React.createClass({
  getInitialState() {
    return {
      "monthSelect": monthSelect
    }
  },

  render() {
    var item = this.state.monthSelect;
    return (
      <select value={this.props.valueD} name={this.props.nameD} onChange={this.props.onChangeD}>
        <option value="">-- Month --</option>
        {
          Object.keys(item).map(function (key) {
            return <option value={key}>{item[key]}</option>
          })
        }
      </select>
    )
  }
});

export default SelectDate;