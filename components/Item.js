import React from 'react';

const Item = React.createClass({

  render() {
    console.log('props', this.props)
    return (
      <ul>
        <li>{this.props.item.name}</li>
        <li>{this.props.item.description}</li>
        <li>{this.props.item.price}</li>
        <li>{this.props.item.date_available}</li>
        <li>{this.props.item.taxable ? 'yes' : 'no'}</li>
      </ul>
    );
  }

});

export default Item;