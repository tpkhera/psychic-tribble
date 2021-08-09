import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";

import App from "./App";

import createApolloClient from "./apollo";

import "normalize.css";
import "./index.css";

const apolloClient = createApolloClient();

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
