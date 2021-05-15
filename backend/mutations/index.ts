import { graphQLSchemaExtension } from "@keystone-next/keystone/schema";
import addToCart from './addToCart';

//Make a fake graphql tagged template literal for syntax highlighting in VS Code.
const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToCart(productId: ID): CartItem
    }
  `,
  resolvers: {
    Mutation: {
      addToCart
    }
  }
})