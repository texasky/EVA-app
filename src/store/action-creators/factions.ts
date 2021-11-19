import axios from "axios"
import { Dispatch } from "redux"
import { factionAction, FetchFactionsActionTypes } from "../../types/types"

export const fetchFactionActions = () => {
    return async (dispatch: Dispatch<factionAction>) => {
        try {
            dispatch({type: FetchFactionsActionTypes.FETCH_FACTIONS})
            const response = await axios.get('https://esi.evetech.net/legacy/universe/factions/')
            dispatch({type: FetchFactionsActionTypes.FETCH_FACTIONS_SUCCESS, payload: response.data})
        } catch (e) {
            dispatch({
                type: FetchFactionsActionTypes.FETCH_FACTIONS_ERROR, 
                payload: 'Error during getting factions'
            })
        }
    }
}