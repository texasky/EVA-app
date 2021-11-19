import axios from "axios";
import React, { Component } from 'react';
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk/es/types";
import { AppStateType } from "../../store";
import { fetchRacesActions } from "../../store/action-creators/races";
import { racesAction } from "../../types/types";
import './PopUp.css';

interface IProps {
    item: any,
    opened: boolean,
    hideModal: Function,
    fetchRaces: Function,
    races: any[]
}

interface IState {
    isOpen: boolean,
    fetchedData: Object,
    fetchedDataTwo: Object,
    showFirst: boolean,
    showSecond: boolean,
    race: {},
}

class PopUp extends Component<IProps, IState> {
    public readonly state: any = { 
        isOpen: this.props.opened,
        fetchedData: {},
        showFirst: false,
        showSecond: false,
        race: {}
    }

    componentDidMount():void {
        this.fetchAdditionalProperties()
        if(!this.props.races.length) {
            this.props.fetchRaces()
        }
    }

    private fetchAdditionalProperties = async () => {
        const response = await axios.get(`https://esi.evetech.net/legacy/characters/${this.props.item.ceo_id}`)
        const { data } = response;
        this.setState((state) => ({
            ...state,
            fetchedData: data
        }))
    }

    private handleSwipeRight = async (e: any) => {
        e.preventDefault();
        this.setState((state) => ({
            ...state,
            showSecond: true,
            showFirst: false
        }))
    }

    private handleSwipeLeft = (e: any) => {
        e.preventDefault();
        this.setState((state) => ({
            ...state,
            showSecond: false,
            showFirst: true
        }))
    }

    private handleClose = (e: any) => {
        if(e.target.className === 'popupWrapper active') {
            this.props.hideModal()
        }
    }

    render() {
        const raceName = this.props.races.filter((el: { race_id: any; }) => el.race_id === this.state.fetchedData.race_id)[0]?.name
        
        return (
            <div onClick={this.handleClose} className={`popupWrapper ${this.props.opened ? 'active' : ''}`}>
                <div className='popupInner'>
                    {!this.state.showSecond ? (
                        <div className={`tabItem ${this.state.showFirst ? 'activeItemFirst' : null}`}>
                            <div>Name: {this.props.item?.name}</div>
                            <div>Member count: {this.props.item.member_count}</div>
                            <div>Description: {this.props.item.description}</div>
                            {this.state.fetchedData.name && <a href='/' onClick={this.handleSwipeRight}>CEO: {this.state.fetchedData.name}</a>}
                            <div className='closeBtn' onClick={this.props.hideModal.bind(this)}>X</div>
                        </div>
                    ) : (
                        <div className={`tabItem ${this.state.showSecond ? 'activeItemSecond' : null}`}>
                            <a href='/' onClick={this.handleSwipeLeft}>Return back</a>
                            <div>Name: {this.props.item.name}</div>
                            <div>Birthday: I didn't find any birthday prop in response</div>
                            <div>Race: {raceName ? raceName : 'No Race Found'}</div>
                            <div className='closeBtn' onClick={this.props.hideModal.bind(this)}>X</div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
      races: state.faction.races
    }
  }
  
  const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, racesAction>) => {
    return {
      fetchRaces: () => dispatch(fetchRacesActions())
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(PopUp);