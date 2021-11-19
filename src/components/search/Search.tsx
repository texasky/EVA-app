import axios from 'axios';
import React, { Component } from 'react';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';

class Search extends Component {
  private categoriesArray = ['agent', 'alliance', 'character', 'constellation', 'corporation', 'faction', 'inventory_type', 'region', 'solar_system', 'station']

  public readonly state = {
    selectedType: 'default',
    insertedQuery: '',
    isSelectValid: false,
    isInputValid: false,
    isTouched: false,
    fetchedData: []
  }

  private setSelectedType(type: string) {
    this.setState((state) => ({
      ...state,
      selectedType: type,
      isSelectValid: !!type
    }));
  }

  private setInsertedQuery(query: string) {
    this.setState((state) => ({
      ...state,
      insertedQuery: query,
      isInputValid: query.length > 2
    }));
  }

  private fetchSearchData = async () => {
    const response = await axios.get(`https://esi.evetech.net/legacy/search?categories=${this.state.selectedType}&search=${this.state.insertedQuery}`)
    const { data } = response;
    console.error('Тут должен сетаться респонс в стейт, но я получаю невалидную дату от этого запроса. Получить какую-либо информацию через проперти возвращаемого не получилось. Поиск в доке по evetech API не дал результата', data)
}

  private submitSearch(event: any) {
    event.preventDefault()
    if(!this.state.isTouched) {
      this.setState((state) => ({
        ...state,
        isTouched: true
      }))
    }
    
    if(this.state.isSelectValid && this.state.isInputValid) {
      this.fetchSearchData()
    }
  }

  render() {
    return (
      <div>
        <SearchForm 
          categories={this.categoriesArray}
          setSelectedType={this.setSelectedType.bind(this)}
          setInsertedQuery={this.setInsertedQuery.bind(this)}
          submitSearch={this.submitSearch.bind(this)}
          isTouched={this.state.isTouched}
          selectedType={this.state.selectedType}
          isSelectValid={this.state.isSelectValid}
          isInputValid={this.state.isInputValid}
        />
        {/* {this.state.fetchedData && <SearchResult data={this.state.fetchedData} />} */}
      </div>
    );
  }
}

export default Search