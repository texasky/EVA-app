import axios from "axios"
import { Dispatch } from "redux"
import { corporationAction, FetchCorpActionTypes } from "../../types/types"

export const fetchCorporationActions = (corpId: string) => {
    return async (dispatch: Dispatch<corporationAction>) => {
        try {
            dispatch({type: FetchCorpActionTypes.FETCH_CORPORATIONS})
            const response = await axios.get(`https://esi.evetech.net/legacy/corporations/${corpId}`)
            dispatch({type: FetchCorpActionTypes.FETCH_CORPORATIONS_SUCCESS, payload: {data: response.data, id: corpId}})
        } catch (e) {
            dispatch({
                type: FetchCorpActionTypes.FETCH_CORPORATIONS_ERROR, 
                payload: 'Error during getting factions'
            })
        }
    }
}