import { GET_TOTAL_PAGES } from "../actions/marketplace";

export default function marketplace(state = null, action) {

    switch(action.type){

        case GET_TOTAL_PAGES:
            return action.marketplace

        default:
            return state;
    }
}