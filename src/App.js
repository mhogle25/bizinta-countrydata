import { ApolloProvider } from "@apollo/client"

import './App.css'

import { client } from "./graphql/client";
import Manager from "./Manager";

const App = () => {
  //className={["App", Classes.DARK].join(' ')}
  return (
      <div className="App" style={{/* backgroundColor: "#2f333c",*/ minHeight: "100vh"}}>
        <ApolloProvider client={client}>
          <Manager/>
        </ApolloProvider>
      </div>
  );
}

export default App;
