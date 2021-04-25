import Form from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    createUser(data: {
      email: $email
      name: $name
      password: $password
    }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: ''
  });
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
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
      <h2>Sign Up for an Account</h2>
      {/* Below error component wont render unless the whole statement is true */}
      <Error error={error} />
      <fieldset>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please go ahead and Sign In!
          </p>
        )}
        <label htmlFor="email">
          Your Name
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            autoComplete="name" 
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
        <label htmlFor="password">
          Password
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            autoComplete="password" 
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  );
}