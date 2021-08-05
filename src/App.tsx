import React from "react";
import {
  useQuery,
  gql
} from "@apollo/client";

import logo from "./logo.svg";
import "./App.css";

const APP_QUERY = gql`
  query AppQuery {
    versions {
      backend {
        version
        buildDate
      }
    }
  }
`;

function App() {
  const { error, data } = useQuery(APP_QUERY);

  let message: React.ReactNode;
  if (error) {
    console.error("error while querying GraphQL service", error);
    message = <>unable to connect to Sensu cluster: <em>{error.message}</em></>;
  } else {
    const date = new Date(data.versions.backend.buildDate);
    message = <>connected to cluster running <em>{data.versions.backend.version} ({date.toLocaleDateString()})</em></>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-body">
        <p>
          <ul>
            <li>reticulating splines...</li>
            <li>calculating llama expectoration trajectory...</li>
            <li>connecting to Sensu cluster...</li>
            <li>{message}</li>
          </ul>
        </p>
        <p>
          <a
            href="https://github.com/apollographql/apollo-client-devtools#installation"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apollo Dev Tools
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
