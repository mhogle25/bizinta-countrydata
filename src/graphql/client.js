//The Apollo Client. Connects to an Apollo Server of country data created by trevorblades.
import {ApolloClient, InMemoryCache} from "@apollo/client";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://countries.trevorblades.com'
});
