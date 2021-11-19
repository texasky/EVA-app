import { combinedAction, FetchCorpActionTypes, FetchFactionsActionTypes, FetchRacesActionTypes, IState } from "../../types/types"

const initialState: IState = {
    factions: [],
    races: [],
    isFactionsLoading: false,
    error: null,
    defaultOpenedComponent: 'faction'
}

const successFactionFetchHandler = (state: IState, payload: any) => {
    const factions = state.factions.map(item => {
        if(item.corporation_id === payload.id) {
            return {
                ...item,
                corporation: payload.data
            }
        } else {
            return item
        }
    });
    return { ...state, factions: factions }
}

export const factionReducer = (state = initialState, action: combinedAction): IState => {
    switch (action.type) {
        case FetchFactionsActionTypes.FETCH_FACTIONS:
            return { ...state, isFactionsLoading: true}
        case FetchFactionsActionTypes.FETCH_FACTIONS_SUCCESS:
            return { ...state, factions: action.payload, isFactionsLoading: false}
        case FetchFactionsActionTypes.FETCH_FACTIONS_ERROR:
            return { ...state, error: action.payload }
        case FetchCorpActionTypes.FETCH_CORPORATIONS:
            return { ...state }
        case FetchCorpActionTypes.FETCH_CORPORATIONS_SUCCESS:
            return successFactionFetchHandler(state, action.payload)
        case FetchCorpActionTypes.FETCH_CORPORATIONS_ERROR:
            return { ...state , error: action.payload}
        case FetchRacesActionTypes.FETCH_RACES:
            return { ...state }
        case FetchRacesActionTypes.FETCH_RACES_SUCCESS:
            return { ...state, races: action.payload }
        case FetchRacesActionTypes.FETCH_RACES_ERROR:
            return { ...state, error: action.payload }
        default:
            return state
    }
} 