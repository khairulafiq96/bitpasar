import { combineReducers } from "redux";
import user from "./users";
import items from "./items"

export default combineReducers({
    user,
    items
})