import { SET_SIGNED_IN_USER, GET_USER_BALANCE,REGISTER_USER, GET_USER_DETAILS } from "../actions/users";

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

      default:
        return state;
    }
  }
