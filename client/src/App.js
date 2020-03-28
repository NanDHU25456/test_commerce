import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './components/Home'
import AddProduct from './components/AddProduct'
import View from './components/View'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route eaxct path="/add" component={AddProduct} />
          <Route exact path="/product/:id" component={View} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
