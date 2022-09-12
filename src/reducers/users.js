import { SET_SIGNED_IN_USER, 
        GET_USER_BALANCE,REGISTER_USER, 
        GET_USER_DETAILS,GET_USER_PURCHASE,
        GET_ALL_ORDERS,
        UPDATE_ORDER_TRACKER,
        GET_ALL_ADS,
         } from "../actions/users";

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
                  mypurchases : {...action.user}}

        case GET_ALL_ORDERS:
          //This state should be updated regularly to get the latest data
          return {...state,
                  myorders : {...action.user}}

        //TODO : Make this work
        case UPDATE_ORDER_TRACKER:
          //Removing the item in to ship
         
          const key = Object.keys(action.user)
          const itemKey = key[0]
          //How to update object in reducer react
          //https://atomizedobjects.com/blog/javascript/how-to-merge-two-objects-in-javascript/
          //https://ncoughlin.com/posts/react-redux-object-based-reducers/
          return {...state,
                myorders : { ...state.myorders, [itemKey] : {...state.myorders[itemKey],...action.user[itemKey]} }}
        
        case GET_ALL_ADS:
                //This state should be updated regularly to get the latest data
                return {...state,
                        myads : {...action.user}}

      default:
        return state;
    }
  }
