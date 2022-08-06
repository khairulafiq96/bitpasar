import { SET_SIGNED_IN_USER, GET_USER_BALANCE,REGISTER_USER } from "../actions/users";

export default function user(state = null, action) {
    switch (action.type) {
      case SET_SIGNED_IN_USER:
        const userAddress = {'address' : action.user[0]}
        return {...state,
                ...userAddress};

        case GET_USER_BALANCE:
        const userBalance = {'balance' : action.user[0]}
        return {...state,
                ...userBalance};

        case REGISTER_USER:
          return {...state,
                  ...action.user}

      default:
        return state;
    }
  }
