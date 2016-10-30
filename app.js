import React from 'react';
import axios from 'axios';
import Item from '../components/Item'

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
    this.loadCommentsFromServer()
      .then(function(response) {
        console.log('=====> ', response.data);
        that.setState({stock: response.data})
      });
  },

  render() {
    console.log('this.state: ', Array.isArray(this.state.stock));
    return (
      <div>
        <h3>STOCK LIST</h3>
          
            {
              this.state.stock.map((item) => {
                <Item
                  key={item.name}
                  itemData={item}
                />
              })
            }
          
      </div>
    );
  }

});

export default App;