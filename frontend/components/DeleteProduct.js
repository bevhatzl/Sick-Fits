import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  console.log(payload);
  console.log('running the update function after delete');
  // Removing the item from the cache
  cache.evict(cache.identify(payload.data.deleteProduct))
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading, error }] = useMutation(DELETE_PRODUCT_MUTATION, {
    // If property and variable name are the same, such as below, you can just state it as the one word. { id: id } is same as { id } 
    variables: { id: id },
    update: update  // Update function will run when the mutation comes back
  });
  return (
    <button 
      type="button" 
      disabled={loading}  // Disable the button while loading
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) {
          // Go ahead and delete it
          console.log('Deleting');
          deleteProduct().catch(err => alert(err.message));
        }
      }}>
      {children}
    </button>
  );
}