export const GET_TOTAL_PAGES = "GET_TOTAL_PAGES"

export function getSearchMarketplaceTotalPages(marketplace) {
    return {
      type: GET_TOTAL_PAGES,
      marketplace
    };
  }