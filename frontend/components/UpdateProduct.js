import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id,
      data: {
        name: $name,
        description: $description,
        price: $price
      }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
    // Get the existing product
    const { data, error, loading } = useQuery (SINGLE_PRODUCT_QUERY, {
      variables: { id }
    });
    // Get the mutation to update the product
    // Renaming them as we destructure them (data, error and loading)
    const [updateProduct, { 
      data: updateData, 
      error: updateError, 
      loading: updateLoading 
    }] = useMutation(UPDATE_PRODUCT_MUTATION);
    // Create some state for the form inputs:
    const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);
    console.log(inputs);
    if(loading) return <p>loading...</p>;
    // We need the form to handle the updates
    return (
      <Form onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateProduct({
          variables: {
            id: id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price
          }
        }).catch(console.error);
        console.log(res);
        // Submit the inputfields to the backend:
        // TODO: Handle Submit!
        // const res = await createProduct();
        // clearForm();
        // // Go to that product's page. Take the returned id from the newly added product and go to that page with router.push
        // Router.push({
        //   pathname: `/product/${res.data.createProduct.id}`
        // });
      }}>
      <DisplayError error={error || updateError} />
        <fieldset disabled={updateLoading} aria-busy={updateLoading}>
          <label htmlFor="name">
            Name
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="Name" 
              value={inputs.name} 
              onChange={handleChange} /> 
          </label>
          <label htmlFor="price">
            Price
            <input 
              type="number" 
              id="price" 
              name="price" 
              placeholder="Price" 
              value={inputs.price} 
              onChange={handleChange} /> 
          </label>
          <label htmlFor="description">
            Description
            <textarea 
              id="description" 
              name="description" 
              placeholder="description" 
              value={inputs.description} 
              onChange={handleChange} /> 
          </label>
          <button type="submit">Update Product</button>
        </fieldset>
      </Form>
    );
}