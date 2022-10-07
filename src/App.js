import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

import Header from './components/Header';

const App = () => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://countries.trevorblades.com'
  });

  return (
    <div className="App">
      <Header/>
    </div>
  );
}

export default App;
