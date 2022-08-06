export const SET_SIGNED_IN_USER = "SET_SIGNED_IN_USER";
export const GET_USER_BALANCE = "SET_USER_BALANCE";
export const REGISTER_USER = "REGISTER_USER ";


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
