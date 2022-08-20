import { GET_ALL_ITEMS } from "../actions/items";

export default function items(state = null, action){
    switch(action.type){

        case GET_ALL_ITEMS:
            return {...state, ...action.items}

        default:
            return state;
    }

}