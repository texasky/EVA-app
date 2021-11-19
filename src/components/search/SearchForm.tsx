import React, { Component } from 'react';
import './SearchForm.css'

interface IProps {
  categories: any[],
  setSelectedType: Function,
  setInsertedQuery: Function,
  submitSearch: Function,
  isTouched: boolean,
  isSelectValid: boolean,
  isInputValid: boolean,
  selectedType: string
}

class SearchForm extends Component<IProps> {
  render() {
    return (
      <div>
        <form onSubmit={(e) => this.props.submitSearch(e)}> 
          <select className={`${!this.props.isSelectValid && this.props.isTouched? 'invalid' : null}`}
                  value={this.props.selectedType}
                  onChange={(e) => this.props.setSelectedType(e.target.value)}>
            <option value='default' disabled>Choose type</option>
            {this.props.categories.map((el) => <option key={Math.random()} value={el}>{el}</option>)}
          </select>
          <input className={`${!this.props.isInputValid && this.props.isTouched ? 'invalid' : null}`} 
                 type='text' 
                 onChange={(e) => this.props.setInsertedQuery(e.target.value)}> 
          </input>
          <button type='submit'>Search</button>
        </form>
        {this.props.isTouched && (!this.props.isInputValid || !this.props.isSelectValid) && <span>Заполните все обязательные поля</span>}
      </div>
    )
  }
}

export default SearchForm
