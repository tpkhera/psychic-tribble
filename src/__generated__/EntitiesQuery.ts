/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EntityListOrder } from "./globalTypes";

// ====================================================
// GraphQL query operation: EntitiesQuery
// ====================================================

export interface EntitiesQuery_namespace_entities_nodes_metadata {
  /**
   * Name must be unique within a namespace. Name is primarily intended for
   * creation idempotence and configuration definition.
   */
  name: string;
}

export interface EntitiesQuery_namespace_entities_nodes {
  /**
   * The globally unique identifier of the record
   */
  id: string;
  /**
   * self descriptive
   */
  entityClass: string;
  /**
   * self descriptive
   */
  subscriptions: string[] | null;
  /**
   * metadata contains name, namespace, labels and annotations of the record
   */
  metadata: EntitiesQuery_namespace_entities_nodes_metadata | null;
}

export interface EntitiesQuery_namespace_entities {
  /**
   * self descriptive
   */
  nodes: EntitiesQuery_namespace_entities_nodes[];
}

export interface EntitiesQuery_namespace {
  /**
   * All entities associated with the namespace.
   */
  entities: EntitiesQuery_namespace_entities;
}

export interface EntitiesQuery {
  /**
   * Namespace fetches the namespace object associated with the given name.
   */
  namespace: EntitiesQuery_namespace | null;
}

export interface EntitiesQueryVariables {
  namespace: string;
  order?: EntityListOrder | null;
  q: string;
}
