import { GET_ALL_ITEMS,FILTER_ITEMS } from "../actions/items";

export default function items(state = null, action){
    switch(action.type){

        case GET_ALL_ITEMS:
            return action.items

        case FILTER_ITEMS:
            return action.items

        default:
            return state;
    }

}