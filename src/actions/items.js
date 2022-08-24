export const GET_ALL_ITEMS = "GET_ALL_ITEMS";
export const FILTER_ITEMS = "FILTER_ITEMS";
export const GET_INDIVIDUAL_ITEM = "GET_INDIVIDUAL_ITEM";


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

