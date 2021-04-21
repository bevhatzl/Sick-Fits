import Form from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email  
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: ''
  });
  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    // Refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })
  async function handleSubmit(e) {
    e.preventDefault();  // Stop the form from submitting
    console.log(inputs);
    const res = await signin();
    console.log(res);
    resetForm();
    // Send the email and pw to the graphqlAPI
  }
  const error = data?.authenticateUserWithPassword.__typename === "UserAuthenticationWithPasswordFailure" ? data?.authenticateUserWithPassword : undefined;
  return (
    <Form method="POST" onSubmit={handleSubmit}>  {/* The POST method keeps the pw out of the url. Https will encrypt the pw. */} 
      <h2>Sign Into Your Account</h2>
      {/* Below error component wont render unless the whole statement is true */}
      <Error error={error} />
      <fieldset>
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