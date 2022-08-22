export const GET_ALL_ITEMS = "GET_ALL_ITEMS";
export const FILTER_ITEMS = "FILTER_ITEMS";


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

