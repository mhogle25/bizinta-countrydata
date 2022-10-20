import { ApolloProvider } from "@apollo/client"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

import { client } from "../graphql/client";
import Manager from "./Manager";

const App = () => {
  //className={["App", Classes.DARK].join(' ')}
  return (
      <div className="App" style={{/* backgroundColor: "#2f333c",*/ minHeight: "100vh" }}>
        <ApolloProvider client={ client }>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <Manager/>
              }/>
            </Routes>
          </BrowserRouter>
        </ApolloProvider>
      </div>
  );
}

export default App;
