export const SET_SIGNED_IN_USER = "SET_SIGNED_IN_USER";
export const GET_USER_BALANCE = "SET_USER_BALANCE";
export const REGISTER_USER = "REGISTER_USER ";
export const GET_USER_DETAILS = "GET_USER_DETAILS";
export const GET_USER_PURCHASE = "GET_USER_PURCHASE";
export const GET_USER_TO_SHIP = "GET_USER_TO_SHIP";
export const UPDATE_ORDER_TRACKER = "UPDATE_ORDER_TRACKER"


export function setSignedInUser(user) {
    return {
      type: SET_SIGNED_IN_USER,
      user
    };
  }

export function getUserBalance(user) {
  return {
    type: GET_USER_BALANCE,
    user
  };
}

export function setRegisterUser(user){
  return {
    type: REGISTER_USER,
    user
  }
}

export function getUserDetails(user){
  return {
    type: GET_USER_DETAILS,
    user
  }
}

export function getUserPurchases(user){
  return {
    type : GET_USER_PURCHASE,
    user
  }
}

export function getAllAds(user){
  return {
    type : GET_USER_TO_SHIP,
    user
  }
}

export function updateOrderTracker(user){
  return {
    type : UPDATE_ORDER_TRACKER,
    user
  }
}
