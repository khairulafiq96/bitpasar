import { SET_SIGNED_IN_USER, 
        GET_USER_BALANCE,REGISTER_USER, 
        GET_USER_DETAILS,GET_USER_PURCHASE,
        GET_USER_TO_SHIP,
        UPDATE_ORDER_TRACKER } from "../actions/users";

export default function user(state = null, action) {
    switch (action.type) {
      case SET_SIGNED_IN_USER:
        const userAddress = {'address' : action.user[0]}
        return {...state,
                ...userAddress};

        case GET_USER_BALANCE:
        //OLD
        //const userBalance = {'balance' : action.user[0]}
        const userBalance = {'balance' : action.user}
        return {...state,
                ...userBalance};

        case REGISTER_USER:
          return {...state,
                  ...action.user};
        
        
        case GET_USER_DETAILS:
          return {
                  ...state,
                  ...action.user
                  }

        case GET_USER_PURCHASE:
          return {...state,
                  mypurchase : {...action.user}}

        case GET_USER_TO_SHIP:
          //This state should be updated regularly to get the latest data
          return {...state,
                  myads : {...action.user}}

        //TODO : Make this work
        case UPDATE_ORDER_TRACKER:
          //Removing the item in to ship
         
          const key = Object.keys(action.user)
          const itemKey = key[0]
          //How to update object in reducer react
          //https://atomizedobjects.com/blog/javascript/how-to-merge-two-objects-in-javascript/
          return {...state,
                   toship : { ...state.toship, [itemKey] : {...state.toship[itemKey],...action.user[itemKey]} }}

      default:
        return state;
    }
  }
