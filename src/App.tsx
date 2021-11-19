import React, { Component } from 'react';
import FactionList from './components/factions/FactionList';
import Search from './components/search/Search';


class App extends Component {
  render() {
    return (
      <div>
        <FactionList />
        <Search />
      </div>
    );
  }
}

export default App