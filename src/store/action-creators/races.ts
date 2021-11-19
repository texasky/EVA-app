import axios from "axios"
import { Dispatch } from "redux"
import { FetchRacesActionTypes, racesAction } from "../../types/types"

export const fetchRacesActions = () => {
    return async (dispatch: Dispatch<racesAction>) => {
        try {
            dispatch({type: FetchRacesActionTypes.FETCH_RACES})
            const response = await axios.get('https://esi.evetech.net/legacy/universe/races/')
            dispatch({type: FetchRacesActionTypes.FETCH_RACES_SUCCESS, payload: response.data})
        } catch (e) {
            dispatch({
                type: FetchRacesActionTypes.FETCH_RACES_ERROR, 
                payload: 'Error during getting factions'
            })
        }
    }
}