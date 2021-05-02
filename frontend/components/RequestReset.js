import Form from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: ''
  });
  const [signup, { data, loading, error }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: inputs,
    // Refetch the currently logged in user
    // refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })
  async function handleSubmit(e) {
    e.preventDefault();  // Stop the form from submitting
    console.log(inputs);
    const res = await signup().catch(console.error);
    console.log(res);
    console.log({data, loading, error});
    resetForm();
    // Send the email and pw to the graphqlAPI
  }
  return (
    <Form method="POST" onSubmit={handleSubmit}>  {/* The POST method keeps the pw out of the url. Https will encrypt the pw. */} 
      <h2>Request a Password Reset</h2>
      {/* Below error component wont render unless the whole statement is true */}
      <Error error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>
            If the email address is associated with an account, you will receive an email with a link!
          </p>
        )}
        <label htmlFor="email">
          email
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email Address" 
            autoComplete="email" 
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}