import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Customers from './Customers';
import SingleCustomer from './SingleCustomer';
import './App.css';
import customers from './customersdata'

class App extends Component {

  constructor(){
    super();
    this.state = {
      customers,
    }
  }

  delete = (id) => {
    const customers = this.state.customers.filter(item=>item.id !== id)
    this.setState({customers})
  }

  render(){
    return (
      <Router>
          <ul className="menu">
            <li> <Link to="/">Home</Link> </li>
            <li> <Link to="/about">About</Link> </li>
            <li> <Link to="/contact">Contact</Link> </li>
            <li> <Link to="/customers">Customers</Link> </li>
          </ul>

          <div className="pages">
            <Switch>
              <Route path="/" exact>
                <div className="page">Home Page</div>
              </Route>
              <Route path="/about">
                <div className="page">About Page</div>
              </Route>
              <Route path="/contact">
                <div className="page">Contact Page</div>
              </Route>
              <Route path="/customers">
                <Customers delete={this.delete} customers={this.state.customers} />
              </Route>
              <Route exact path="/customer/:id">
                <SingleCustomer delete={this.delete} customers={this.state.customers} />
              </Route>
              <Route path="/customer/:id/:action">
                <SingleCustomer delete={this.delete} customers={this.state.customers} />
              </Route>
            </Switch>
          </div>
      </Router>
    )
  }
}


export default App;