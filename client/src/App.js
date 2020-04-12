import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './components/Home'
import Signin from './components/Signin'
import Signup from './components/Signup'
import AddProduct from './components/AddProduct'
import View from './components/View'
import PrivateRoute from './components/PrivateRoute'
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false
    }
  }

  setLoggedIn = (value) => {
    this.setState({ loggedIn: value })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Nav loggedIn={this.state.loggedIn} />
          <Switch>
            <Route exact path="/" render={(props) => <Signin {...props} setLoggedIn={this.setLoggedIn} />} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute eaxct path="/add" component={AddProduct} />
            <PrivateRoute exact path="/product/:id" component={View} />
          </Switch>
        </Router>
      </div>
    );
  }

}

