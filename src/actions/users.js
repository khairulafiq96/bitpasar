export const SET_SIGNED_IN_USER = "SET_SIGNED_IN_USER";

export function setSignedInUser(user) {
    return {
      type: SET_SIGNED_IN_USER,
      user
    };
  }