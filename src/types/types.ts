export interface IState {
    factions: any[];
    races: any;
    isFactionsLoading: boolean;
    error: null | string;
    defaultOpenedComponent: string
}

export enum FetchFactionsActionTypes {
    FETCH_FACTIONS = 'FETCH_FACTIONS',
    FETCH_FACTIONS_SUCCESS = 'FETCH_FACTIONS_SUCCESS',
    FETCH_FACTIONS_ERROR = 'FETCH_FACTIONS_ERROR',
}

export enum FetchCorpActionTypes {
    FETCH_CORPORATIONS = 'FETCH_CORPORATIONS',
    FETCH_CORPORATIONS_SUCCESS = 'FETCH_CORPORATIONS_SUCCESS',
    FETCH_CORPORATIONS_ERROR = 'FETCH_CORPORATIONS_ERROR',
}


export enum FetchRacesActionTypes {
    FETCH_RACES = 'RACES',
    FETCH_RACES_SUCCESS = 'FETCH_RACES_SUCCESS',
    FETCH_RACES_ERROR = 'FETCH_RACES_ERROR',
}

interface IFetchFactionsAction {
    type: FetchFactionsActionTypes.FETCH_FACTIONS;
}

interface IFetchFactionsSuccessAction {
    type: FetchFactionsActionTypes.FETCH_FACTIONS_SUCCESS;
    payload: any[];
}

interface IFetchFactionsErrorAction {
    type: FetchFactionsActionTypes.FETCH_FACTIONS_ERROR;
    payload: string;
}

interface IFetchCorpAction {
    type: FetchCorpActionTypes.FETCH_CORPORATIONS;
}

interface IFetchCorpSuccessAction {
    type: FetchCorpActionTypes.FETCH_CORPORATIONS_SUCCESS;
    payload: any;
}

interface IFetchCorpErrorAction {
    type: FetchCorpActionTypes.FETCH_CORPORATIONS_ERROR;
    payload: string;
}

interface IFetchRacesAction {
    type: FetchRacesActionTypes.FETCH_RACES;
}

interface IFetchRacesSuccessAction {
    type: FetchRacesActionTypes.FETCH_RACES_SUCCESS;
    payload: any;
}

interface IFetchRacesErrorAction {
    type: FetchRacesActionTypes.FETCH_RACES_ERROR;
    payload: string;
}

export type racesAction = 
    IFetchRacesAction 
    | IFetchRacesSuccessAction 
    | IFetchRacesErrorAction;

export type corporationAction = 
    IFetchCorpAction 
    | IFetchCorpSuccessAction 
    | IFetchCorpErrorAction;

export type factionAction = 
    IFetchFactionsAction 
    | IFetchFactionsSuccessAction 
    | IFetchFactionsErrorAction;

export type combinedAction = 
    IFetchFactionsAction 
    | IFetchFactionsSuccessAction 
    | IFetchFactionsErrorAction 
    | IFetchCorpAction 
    | IFetchCorpSuccessAction 
    | IFetchCorpErrorAction
    | IFetchRacesAction
    | IFetchRacesSuccessAction
    | IFetchRacesErrorAction;
    
