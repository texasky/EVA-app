import { combineReducers } from "redux";
import { factionReducer } from "./factionReducers";

export const rootReducer = combineReducers({
    faction: factionReducer
})