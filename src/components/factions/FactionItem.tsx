import axios from 'axios';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk/es/types';
import { fetchCorporationActions } from '../../store/action-creators/corporations';
import { corporationAction} from '../../types/types';
import PopUp from '../popup/PopUp';
import './FactionItem.css';

interface ServerData {
  name: string;
}

interface IFaction {
  name: string,
  faction_id: number,
  description: string,
  corporation_id: number,
  solar_system_id: number,
  corporation?: any,
}

interface IProps {
  fraction: IFaction,
  fetchCorporation: Function,
}

interface IState {
  solarSystemId: number,
  isOpened: boolean;
  isSolarNameLoaded: boolean;
  solarSystemName: null | string;
  showModal: boolean;
}

class FactionItem extends PureComponent<IProps, IState> {
  public readonly state = {
    isOpened: false,
    isSolarNameLoaded: false,
    solarSystemName: null,
    solarSystemId: this.props.fraction.solar_system_id,
    showModal: false,
  }

  private fetchAdditionalProperties = () => {
    return new Promise<void>((resolve, reject) => {
      axios.request<ServerData>({
        url: `https://esi.evetech.net/legacy/universe/systems/${this.props.fraction.solar_system_id}`,
      }).then((response) => {
        const { data } = response;
        this.setState({ solarSystemName: data.name, isSolarNameLoaded: true })
        resolve()
      })
      .catch((error) => reject(error))
    });
  }

  private toggleOpenState = () => {
    this.setState((state) => ({
      ...state,
      isOpened: !state.isOpened
    }));
  }

  private handleClick = () => {
    if(!this.state.isSolarNameLoaded) {
      this.fetchAdditionalProperties()
      .finally(() => {
        this.toggleOpenState()
        this.props.fetchCorporation(this.props.fraction.corporation_id)
      })
      .catch((error) => console.error(error))
    } else {
      this.toggleOpenState();
    }
  }

  private showModal = (e: any) => {
    e.preventDefault();
    this.setState((state) => ({
      ...state,
      showModal: true
    }))
  }

  private hideModal = () => {
    this.setState((state) => ({
      ...state,
      showModal: false
    }))
  }

  render() {
    return (
      <>
        <div className="factionItem" onClick={this.handleClick}>
          <div>{this.props.fraction.name}</div>
          {this.state.isOpened && (
            <>
              <div>Description: {this.props.fraction.description}</div>
              <div>Solar System: {this.state.solarSystemName}</div>
              {this.props.fraction?.corporation?.name && <a href={'/'} onClick={this.showModal}>{this.props.fraction?.corporation?.name}</a>}
            </>
          )}
        </div>
        {this.state.showModal && <PopUp item={this.props.fraction.corporation} opened={this.state.showModal} hideModal={this.hideModal} />}
      </>
    
    )
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, corporationAction>) => {
  return {
    fetchCorporation: (id: string) => dispatch(fetchCorporationActions(id))
  }
}

export default connect(null,mapDispatchToProps)(FactionItem)