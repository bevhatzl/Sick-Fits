// The filename [id].js matches anything with the url ending product/id_number and then gets the id_number in a query param

import SingleProduct from "../../components/SingleProduct";

export default function SingleProductPage({ query }) {  // destructuring the props.query
  return <SingleProduct id={query.id} />;
}