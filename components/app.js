import React from 'react';
import axios from 'axios';
import SelectDate from './SelectDate';
import Item from './Item';

const App = React.createClass({

  getInitialState() {
    return {
      "stock": [],
      "new_item": {
        "id": undefined,
        "name": "",
        "description": "",
        "price": undefined,
        "date_available": {
          "month": "",
          "day": "",
          "year": ""
        },
        "taxable": true
      }
    };
  },

  handleChangeValue(event) {
    var new_item = this.state.new_item;

    if(event.target.name.indexOf('.') !== -1) {
      var arr = event.target.name.split('.');
      var a = arr[0];
      var b = arr[1];

      new_item[a][b] = event.target.value;
      this.setState({new_item: new_item});
    } else {
      new_item[event.target.name] = event.target.value;
      this.setState({new_item: new_item});
    }
  },

  loadStockData() {
    var that = this;
    axios.get('/getStock')
      .then(function(response) {
        that.setState({ stock: response.data });
      });
  },

  componentDidMount() {
    this.loadStockData();
  },

  addStockItem(event) {
    // var ele = document.getElementById('hidethis');
    // console.log(ele)
    if(document.getElementById('hidethis').className.match('show-form')) {
      document.getElementById('hidethis').className = 'hide-form';
    } else {
      document.getElementById('hidethis').className = 'show-form';
    }
  },

  submitNewStockItem(event) {
    event.preventDefault();
    document.getElementById('hidethis').className = 'hide-form';

    var that = this;
    axios.post('/addStockItem', {
      params: [{
        id: "",
        name: this.state.new_item.name,
        description: this.state.new_item.description,
        price: this.state.new_item.price,
        date_available: {
          month: this.state.new_item.date_available.month,
          day: this.state.new_item.date_available.day,
          year: this.state.new_item.date_available.year
        },
        taxable: "yes"
      }]
    })
    .then(function(response) {
      // that.setState({ stock: response.data });
      // console.log('ADDED STOCK ITEM: ', response.data);
      that.setState({stock: response.data})
    });

  },

  render() {
    if (this.state.stock.length > 0) {

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
        <div>
          <h3>Stock List</h3>

          <button 
            type="button" 
            id="btn-edit"
            onClick={this.addStockItem}>Add Stock Item
          </button>

          <div id="hidethis" className='hide-form' onSubmit={this.submitNewStockItem}>
            <form>
              <input
                type="text"
                name="name"
                placeholder="Item Name"
                value={this.state.new_item.name}
                onChange={this.handleChangeValue}
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={this.state.new_item.description}
                onChange={this.handleChangeValue}
              />
              <input
                type="text"
                name="price"
                placeholder="Price"
                value={this.state.new_item.price}
                onChange={this.handleChangeValue}
              />
              <div>
                <SelectDate
                  key="month-select"
                  valueD={this.state.new_item.date_available.month}
                  nameD="date_available.month"
                  onChangeD={this.handleChangeValue}
                />
                
              <input
                className="date-day"
                type="text"
                name="date_available.day"
                placeholder="DD"
                value={this.state.new_item.date_available.day}
                onChange={this.handleChangeValue}
              />

              {/*
                <select value={this.state.new_item.date_available.day} name="date_available.day" onChange={this.handleChangeValue}>

                  <option value="">-- Day --</option>
                  {daysOptions}
                </select>
              */}

                <select value={this.state.new_item.date_available.year} name="date_available.year" onChange={this.handleChangeValue}>
                  <option value="">-- Year --</option>
                  {yearsOptions}
                </select>
              </div>
              <select value={this.state.new_item.taxable} name="date_available" onChange={this.handleChangeValue}>
                <option value="">-- Taxable --</option>
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
              <button type="submit" className="btn btn-secondary">Add Item</button>
            </form>
          </div>


          <table className="stock-data-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Date Available</th>
                <th>Is Taxable</th>
              </tr>
            </thead>
            <tbody>
            {
              this.state.stock.map((item) => 
                <Item
                  key={item.id}
                  item={item}
                  dateSelect={this.state.monthSelect}
                />
              )
            }
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <p>Loading...</p>
    );
  }
});

export default App;