import { combineReducers } from "redux";
import user from "./users";
import items from "./items"
import marketplace from './marketplace'

export default combineReducers({
    user,
    items,
    marketplace
})