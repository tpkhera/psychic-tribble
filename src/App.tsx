import React from "react";
import { useQuery, gql } from "@apollo/client";

// TODO: Implement me!
import { EntitiesList } from "components";
import { EntityListOrder } from "helpers/types-helper";
import { logo } from "assets";
import "./App.css";

// As an example: query version & build date from service
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

// NOTE: Feel free to delete me at your lesuire
function App() {
  const { loading, error, data } = useQuery(APP_QUERY);

  let message: React.ReactNode;
  if (error) {
    console.error("error while querying GraphQL service", error);
    message = (
      <>
        unable to connect to Sensu cluster: <em>{error.message}</em>
      </>
    );
  } else if (!loading && data) {
    const date = new Date(data.versions.backend.buildDate);
    message = (
      <>
        connected to cluster running{" "}
        <em>
          {data.versions.backend.version} ({date.toLocaleDateString()})
        </em>
      </>
    );
  }

  // See "Response Filtering" for example usage: https://docs.sensu.io/sensu-go/latest/api/#response-filtering
  const q = `fieldSelector: entity.class != service`;

  // The 'default' namespace is seeded by... default

  // Using the development namespace here, as default had no data in the sample.
  // Ideally, in order to display all the entities, would really have preferred
  // a query to fetch all the namespaces and traverse thru each to fetch the respective entities.
  const namespace = "development";

  // Use documentation tab in GraphiQL for more options
  const order = EntityListOrder.ID;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <div className="App-body">
        <div>
          <ul>
            <li>reticulating splines...</li>
            <li>calculating llama expectoration trajectory...</li>
            <li>connecting to Sensu cluster...</li>
            <li>{message}</li>
          </ul>
        </div>

        <p>
          <a href="/graphiql" target="_blank" rel="noopener noreferrer">
            GraphiQL
          </a>
          {" · "}
          <a
            href="https://github.com/apollographql/apollo-client-devtools#installation"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apollo Dev Tools
          </a>
        </p>

        <EntitiesList entitiesListProps={{ q, namespace, order }} />
      </div>
    </div>
  );
}

export default App;
