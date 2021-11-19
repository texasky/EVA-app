import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';
import { AppStateType } from '../../store';
import { fetchFactionActions } from '../../store/action-creators/factions';
import { factionAction } from '../../types/types';
import FactionItem from './FactionItem';
import './FactionList.css';

interface IProps {
  factions: any[];
  isFactionsLoading: boolean;
  fetchFactions: Function;
}

class FactionList extends Component<IProps> {
  componentDidMount():void {
    this.props.fetchFactions()
  }

  render() {
    return (
      <div className='faction-container'>
        {
        !this.props.isFactionsLoading && this.props.factions.map(el => {
            return (
             <FactionItem 
               key={el.faction_id}
               fraction={el}
               />
             )
           })
        }
        {this.props.isFactionsLoading && <h1>Factions Loading...</h1>}
      </div>
    )
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    factions: state.faction.factions,
    isFactionsLoading: state.faction.isFactionsLoading
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, factionAction>) => {
  return {
    fetchFactions: () => dispatch(fetchFactionActions())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FactionList)