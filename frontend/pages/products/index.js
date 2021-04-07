import { useRouter } from "next/dist/client/router";
import Pagination from "../../components/Pagination";
import Products from "../../components/Products";

export default function ProductsPage() {
    const { query } = useRouter(); // A hook that comes with nextjs
    const page = parseInt(query.page); // page is a string
    return (
      <div>
        <Pagination page={page || 1} />
        <Products page={page || 1} />
        <Pagination page={page || 1} />
      </div>
    );
}