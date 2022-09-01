export const GET_ALL_ITEMS = "GET_ALL_ITEMS";
export const FILTER_ITEMS = "FILTER_ITEMS";
export const GET_INDIVIDUAL_ITEM = "GET_INDIVIDUAL_ITEM";
//with purchase object
export const CONFIRM_PURCHASE = "CONFIRM_PURCHASE";
export const VERIFY_PAYMENT = "VERIFY_PAYMENT";


export function getAllMarketplaceItems(items) {
    return {
      type: GET_ALL_ITEMS,
      items
    };
  }

export function getSearchMarketplaceItems(items) {
  return {
    type: FILTER_ITEMS,
    items
  };
}

export function getIndividualItem(items){
  return {
    type: GET_INDIVIDUAL_ITEM,
    items
  }
}

export function setConfirmPurchase(purchase){
  return {
    type : CONFIRM_PURCHASE,
    purchase
  }
}

export function postVerifyPayment(purchase){
  return {
    type : VERIFY_PAYMENT,
    purchase
  }
}
