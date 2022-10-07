import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client"

import ContinentsHeader from './components/ContinentsHeader';

const App = () => {
  //The Apollo Client. Connects to an Apollo Server of country data created by trevorblades.
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://countries.trevorblades.com'
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <ContinentsHeader client={client}/>
      </div>
    </ApolloProvider>
  );
}

export default App;
