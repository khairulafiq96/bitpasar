import { CONFIRM_PURCHASE, VERIFY_PAYMENT } from "../actions/items";

export default function purchase(state = null, action){
    switch(action.type){

        case CONFIRM_PURCHASE:
            return action.purchase

        case VERIFY_PAYMENT:
            return action.purchase

        default:
            return state;
    }

}
