import React from "react";
import { useQuery, gql } from "@apollo/client";

// See "Response Filtering" for example usage: https://docs.sensu.io/sensu-go/latest/api/#response-filtering
const q = `fieldSelector: entity.class != service`;

// Use 'default' namespace by default
const namespace = "default";

// Use documentation tab in GraphiQL for more
const order = "ID";

// Query entities within the given namespace.
const query = gql`
  query EntitiesQuery(
    $namespace: String!
    $order: EntityListOrder
    $q: String!
  ) {
    namespace(name: $namespace) {
      entities(orderBy: $order, filters: [$q]) {
        nodes {
          id
        }
      }
    }
  }
`;

function EntitiesList() {
  const variables = { namespace, q, order };
  const { loading, error, data } = useQuery(query, { variables });

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return (
      <p>
        Error querying entities: <em>{error.message}</em>
      </p>
    );
  }

  return (
    <div>
      <ul>
        {data?.namespace?.entities.nodes.map((node: any) => (
          <li>{node.id}</li>
        ))}
      </ul>
    </div>
  );
}

export default EntitiesList;
