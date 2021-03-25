import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import Form from './styles/Form';
import Router from 'next/router';

const CREATE_PRODUCT_MUTATION = gql`
# This is all graphql notation and not javascript
  mutation CREATE_PRODUCT_MUTATION(
    # which variables are getting passed in ? ANd what types are they?
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
        data:{
          name: $name
          description: $description
          price: $price
          status: "AVAILABLE"
          photo: {
            create: {
              image: $image,
              altText: $name
            }
          }
        }
    ) {
      id
      price
      description
      name
	  }
  }
`;

export default function CreateProduct() {
    const { inputs, handleChange, clearForm, resetForm } = useForm({
      image: '',
      name: 'Nice Shoes',
      price: 20399,
      description: 'These are the best shoes.'
    });
    const [createProduct, {loading, error, data}] = useMutation(CREATE_PRODUCT_MUTATION, {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }]
    });
    return (
    <Form onSubmit={async (e) => {
      e.preventDefault();
      // Submit the inputfields to the backend:
      const res = await createProduct();
      clearForm();
      // Go to that product's page. Take the returned id from the newly added product and go to that page with router.push
      Router.push({
        pathname: `/product/${res.data.createProduct.id}`
      });
    }}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input required
            type="file" 
            id="image" 
            name="image" 
            onChange={handleChange} /> 
        </label>
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
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  )
}