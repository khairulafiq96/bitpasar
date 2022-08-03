import { SET_SIGNED_IN_USER } from "../actions/users";

export default function user(state = null, action) {
    switch (action.type) {
      case SET_SIGNED_IN_USER:

        const userAddress = {'address' : action.user}

        return {...state,
                ...action.user};

      default:
        return state;
    }
  }
