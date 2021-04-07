import { PAGINATION_QUERY } from "../components/Pagination";

export default function paginationField() {
  return {
    keyArgs: false,  // tells Apollo we will take care of everything.
    read(existing = [], { args, cache }) {
      console.log({ existing, args, cache });
      const { skip, first } = args; //object destructure
      // Read the number of items on the page from the cache
      // Must be passed a GraphQL query
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      // The ? in the below ensures it doesn't break if that data is undefined. There is a possibility these don't exist yet.
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);
      // Check if we have existing items. If the item is undefined it will be filtered out from the list of items.
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // If there are items AND there aren't enough items to satisfy how many were requested AND we are on the last page...THEN just send it.
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // We don't have any items, we must go to the network to fetch them
        return false;
      }
      // If there are items, just return them from the cache, and we don't need to go to the network.
      if (items.length) {
        console.log(`There are ${items.length} items in the cache! Going to send them to Apollo`);
        return items;
      }
      return false;  // Fallback to network

      // First thing it does is ask the read function for the items.
      // We can either do 1 of 2 things:
      // 1. Return the items because they are already in the cache.
      // 2. Return false from here which will make a network request.
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // This runs when the Apollo client comes back from the network with the products.
      console.log(`Merging items from the network ${incoming.length}`);
      // If there are existing items in the cache then we take a copy of the existing, otherwise we want an empty array.
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      console.log(merged);
      // We return the merged items from the cache, Apollo will automatically run the read function.
      return merged;
    }
  }
}