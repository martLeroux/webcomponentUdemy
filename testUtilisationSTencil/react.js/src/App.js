import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <dsc-stock-finder></dsc-stock-finder>
        <dsc-stock-price stock-symbol="AAPL"></dsc-stock-price>
      </>
    );
  }
}

export default App;
