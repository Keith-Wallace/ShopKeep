import React from 'react';
import axios from 'axios';

import StockItem from './StockItem'

const Dashboard = React.createClass({
  getInitialState() {
    return {
      "stock": [],
      "new_item": {
        "name": "",
        "description": "",
        "price": 0.00,
        "available_date": {
          "month": "",
          "day": "",
          "year": ""
        },
        "taxable": ""
      }
    };
  },

  handleChangeValue(event) {
    var new_item = this.state.new_item;

    // CHECK IF DATA CHANGE
    if(event.target.name.indexOf('.') !== -1) {
      var dateArray = event.target.name.split('.');
      var available_date = dateArray[0];
      var sub_key = dateArray[1];
      new_item[available_date][sub_key] = event.target.value;
    } else {
      new_item[event.target.name] = event.target.value;
    }

    this.setState({new_item: new_item});
  },

  loadStockData() {
    var that = this;
    axios.get('/getStockData')
    .then(function(response) {
      that.setState({ stock: response.data });
    });
  },

  componentDidMount() {
    this.loadStockData();
  },

  addStockItem(event) {
    // var formNode = document.getElementById('form-add-item');
    var formNode = document.getElementById('add-item');

    if(formNode.className.match('hide-form')) {
      formNode.className = formNode.className.replace('hide-form', 'show-form');
    } else {
      formNode.className = formNode.className.replace('show-form', 'hide-form');
    }
  },

  submitNewStockItem(event) {
    event.preventDefault();
    document.getElementById('add-item').className = document.getElementById('add-item').className.replace('show-form', 'hide-form');

    var that = this;
    axios.post('/addStockItem', {
      params: [{
        name: this.state.new_item.name,
        description: this.state.new_item.description,
        price: this.state.new_item.price,
        available_date: {
          month: this.state.new_item.available_date.month,
          day: this.state.new_item.available_date.day,
          year: this.state.new_item.available_date.year
        },
        taxable: "YES"
      }]
    })
    .then(function(response) {
      that.setState({stock: response.data})
    });
  },

  render() {
    return(
      <div>
        <header>
          <div className="logo">
            <img src="assets/logo-shopkeep.svg" alt="ShopKeep" title="ShopKeep" />
          </div>
          <div className="add-item">
            <button onClick={this.addStockItem}>+ ADD ITEM</button>
          </div>
        </header>
        <table className="table-data">
          <thead>
            <tr>
              <th>NAME</th>
              <th>DESCRIPTION</th>
              <th>PRICE</th>
              <th>AVAILABLE DATE</th>
              <th>TAXABLE</th>
            </tr>
          </thead>
          <tbody>
            <tr id="add-item" className="hide-form">
              <td>
                <input
                  type="text"
                  name="name"
                  placeholder="Item Name"
                  value={this.state.new_item.name}
                  onChange={this.handleChangeValue}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={this.state.new_item.description}
                  onChange={this.handleChangeValue}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={this.state.new_item.price}
                  onChange={this.handleChangeValue}
                  className="form-price"
                />
              </td>
              <td>
                <select
                  value={this.state.new_item.available_date.month}
                  name="available_date.month"
                  onChange={this.handleChangeValue}
                >
                  <option value="">- Month -</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
                <select
                  value={this.state.new_item.available_date.day}
                  name="available_date.day"
                  onChange={this.handleChangeValue}
                >
                  <option value="">- Day -</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </select>
                <select
                  value={this.state.new_item.available_date.year}
                  name="available_date.year"
                  onChange={this.handleChangeValue}
                >
                  <option value="">- Year -</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                </select>
              </td>
              <td>
                <select
                  value={this.state.new_item.taxable}
                  name="available_date"
                  onChange={this.handleChangeValue}
                >
                  <option value="">- Tax -</option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
                <button className="btn-add-item" name="add" onClick={this.submitNewStockItem}>+ NEW ITEM</button>
              </td>
            </tr>
            {
              this.state.stock.map((item) => 
                <StockItem
                  key={item.id}
                  data={item}
                />
              )
            }
          </tbody>
        </table>

        {/*<form id="form-add-item" className="form hide-form" onSubmit={this.submitNewStockItem}>
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    name="name"
                    placeholder="Item Name"
                    value={this.state.new_item.name}
                    onChange={this.handleChangeValue}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={this.state.new_item.description}
                    onChange={this.handleChangeValue}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="price"
                    placeholder="Price"
                    value={this.state.new_item.price}
                    onChange={this.handleChangeValue}
                  />
                </td>
                <td>
                  <select
                    value={this.state.new_item.available_date.month}
                    name="available_date.month"
                    onChange={this.handleChangeValue}
                  >
                    <option value="">- Month -</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                  <select
                    value={this.state.new_item.available_date.day}
                    name="available_date.day"
                    onChange={this.handleChangeValue}
                  >
                    <option value="">- Day -</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>
                  <select
                    value={this.state.new_item.available_date.year}
                    name="available_date.year"
                    onChange={this.handleChangeValue}
                  >
                    <option value="">- Year -</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                  </select>
                </td>
                <td>
                  <select
                    value={this.state.new_item.taxable}
                    name="available_date"
                    onChange={this.handleChangeValue}
                  >
                    <option value="">- Taxable -</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <button className="btn-cancel-item" name="cancel">CANCEL</button>
          <button className="btn-add-item" name="add">ADD NEW ITEM</button>
        </form>*/}

      </div>
    );
  }
});

export default Dashboard;