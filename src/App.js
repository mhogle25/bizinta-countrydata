import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client"

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import ContinentsHeader from './components/ContinentsHeader';

const App = () => {
  //The Apollo Client. Connects to an Apollo Server of country data created by trevorblades.
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://countries.trevorblades.com'
  });

  return (
      <div className="App bp4-dark" style={{ backgroundColor: "#2f333c", minHeight: "100vh"}}>
        <ApolloProvider client={client}>
          <ContinentsHeader client={client}/>
        </ApolloProvider>
      </div>
  );
}

export default App;
