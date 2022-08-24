import { GET_ALL_ITEMS,FILTER_ITEMS,GET_INDIVIDUAL_ITEM } from "../actions/items";

export default function items(state = null, action){
    switch(action.type){

        case GET_ALL_ITEMS:
            return action.items

        case FILTER_ITEMS:
            return action.items
        
        case GET_INDIVIDUAL_ITEM:
            return {...state,...action.items}

        default:
            return state;
    }

}