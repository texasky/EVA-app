import React, { Component } from 'react';
import SearchResultItem from './SearchResultItem';

interface IProps {
  data: any[]
}

class SearchResult extends Component<IProps> {
  render() {
    console.log(this.props)
    return (
      <div>
        {/* <SearchResultItem /> */}
      </div>
    );
  }
}

export default SearchResult