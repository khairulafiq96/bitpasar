export const GET_ALL_ITEMS = "GET_ALL_ITEMS";

export function getAllMarketplaceItems(items) {
    return {
      type: GET_ALL_ITEMS,
      items
    };
  }