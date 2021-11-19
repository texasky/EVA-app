import React, { Component } from 'react';

interface IProps {
    name: any
  }

class SearchResultItem extends Component<IProps> {
  render() {
    return (
      <div>
        <div>{this.props}</div>
      </div>
    );
  }
}

export default SearchResultItem