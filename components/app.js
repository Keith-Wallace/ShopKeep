import React from 'react';
import axios from 'axios';
import Item from './Item'

const App = React.createClass({

  getInitialState() {
    return {
      stock: []
    };
  },

  loadCommentsFromServer() {
    return axios.get('/getStock')
  },

  componentDidMount() {
    var that = this;
    // this.loadCommentsFromServer()
    axios.get('/getStock')
      .then(function(response) {
        that.setState({stock: response.data})
      });
  },

  render() {
    console.log('=====> ', this.state.stock);

    if (this.state.stock.length > 0) {
      return (
        <div>
          <h3>Stock List</h3>
          {
            this.state.stock.map((item) => 
              <Item
                key={item.name}
                item={item}
              />
            )
          }
        </div>
      );
    }

    return (
      <p>Loading...</p>
    );
  }

});

export default App;