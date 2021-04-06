import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

//Don't need to name the below query since there is no arguments or variables but you can name it anyway.
const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {  
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);
  if (loading) return 'Loading...';
  if (error) return <DisplayError error={error}/>;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  return (
    <PaginationStyles>
      <Head>
        <title>Sick Fits - Page {page} of ___</title>
      </Head>
      <Link 
        href={`/products/${page - 1}`}>  
        <a aria-disabled={page <= 1}>← Prev</a>  
      </Link>
        <p>Page {page} of {pageCount}</p>
        <p>{count} Items Total</p>
      <Link 
        href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next →</a>
      </Link>
    </PaginationStyles>
  );
}

// Unable to add other attributes to the Link tag so we need the anchor tag.
// Disable the prev link if we are at first page and disable the next link if at last page.