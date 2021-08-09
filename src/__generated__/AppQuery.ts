/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AppQuery
// ====================================================

export interface AppQuery_versions_backend {
  /**
   * Version of the current node; adheres to semver.
   */
  version: string | null;
  /**
   * self descriptive
   */
  buildDate: any | null;
}

export interface AppQuery_versions {
  /**
   * self descriptive
   */
  backend: AppQuery_versions_backend | null;
}

export interface AppQuery {
  /**
   * Describes the versions of each component of the backend.
   */
  versions: AppQuery_versions;
}
