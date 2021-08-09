import { gql, useQuery } from "@apollo/client";
import { EntitiesQuery, EntitiesQueryVariables } from "helpers/types-helper";

const ENTITIES_QUERY = gql`
  query EntitiesQuery(
    $namespace: String!
    $order: EntityListOrder
    $q: String!
  ) {
    namespace(name: $namespace) {
      entities(orderBy: $order, filters: [$q]) {
        nodes {
          id
          entityClass
          subscriptions
          metadata {
            name
          }
        }
      }
    }
  }
`;

export const useEntitiesQuery = (variables: EntitiesQueryVariables) =>
  useQuery<EntitiesQuery, EntitiesQueryVariables>(ENTITIES_QUERY, {
    variables,
  });
