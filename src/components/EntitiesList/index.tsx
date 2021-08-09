import React, { useState, useEffect, ChangeEvent } from "react";

import { useEntitiesQuery } from "graphql/entity/entity.queries";
import {
  EntityListOrder,
  EntitiesQuery_namespace_entities_nodes,
} from "helpers/types-helper";
import { sortArrows, closeIcon } from "assets";

import * as S from "./styles";

type EntitiesListProps = {
  namespace: string;
  q: string;
  order: EntityListOrder;
};

const EntitiesList: React.FC<{ entitiesListProps: EntitiesListProps }> = ({
  entitiesListProps,
}: {
  entitiesListProps: EntitiesListProps;
}) => {
  const entitiesQueryVariables = entitiesListProps;
  const { loading, error, data } = useEntitiesQuery(entitiesQueryVariables);

  const [fetchedEntityNodes, setFetchedEntityNodes] =
    useState<EntitiesQuery_namespace_entities_nodes[]>();
  const [filteredEntityNodes, setFilteredEntityNodes] =
    useState<EntitiesQuery_namespace_entities_nodes[]>();
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const sortEntityNodes = () => {
    // Sorting ID by default
    // @ts-ignore
    const sortedEntityNodes = [].concat(...filteredEntityNodes).sort((a, b) => {
      // @ts-ignore
      return sortAsc ? b.id.localeCompare(a.id) : a.id.localeCompare(b.id);
    });

    setFilteredEntityNodes(sortedEntityNodes);
  };

  const onToggleSort = () => {
    setSortAsc(!sortAsc);
    sortEntityNodes();
  };

  const filterEntityNodes = (filterTerm?: string) => {
    if (!filterTerm) {
      setFilteredEntityNodes(fetchedEntityNodes);
      return;
    }

    const filteredEntities = fetchedEntityNodes?.filter((entity) => {
      return entity.id.includes(filterTerm);
    });

    setFilteredEntityNodes(filteredEntities);
  };

  const onFilterTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    filterEntityNodes(e.target.value);
  };

  const deleteEntityNode = (entityId: string) => {
    // I wasn't sure if the intention here was to simply remove the entity from entities table,
    // or to utilize the deleteEntity mutation to actually delete the entity and then refetch the EntitiesQuery
    setFilteredEntityNodes(
      filteredEntityNodes?.filter((node) => node.id !== entityId)
    );
  };

  useEffect(() => {
    setFetchedEntityNodes(data?.namespace?.entities.nodes);
    setFilteredEntityNodes(data?.namespace?.entities.nodes);
  }, [data]);

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
    <S.EntityTable>
      <S.EntityTableTitle>
        List of Entities: {entitiesListProps.namespace}
      </S.EntityTableTitle>
      <S.SearchInputContainer>
        <S.SearchInput
          placeholder="Filter entities"
          onChange={onFilterTermChange}
        />
      </S.SearchInputContainer>
      <EntityTableHeader onToggleSort={onToggleSort} />
      {filteredEntityNodes?.length ? (
        filteredEntityNodes.map((node, idx) => (
          <EntityTableRow
            key={idx}
            entityNode={node}
            deleteEntityNode={deleteEntityNode}
          />
        ))
      ) : (
        <S.EmptyTable>No entities in current namespace</S.EmptyTable>
      )}
    </S.EntityTable>
  );
};

type EntityTableHeaderProps = {
  onToggleSort: () => void;
};

const EntityTableHeader: React.FC<EntityTableHeaderProps> = ({
  onToggleSort,
}: EntityTableHeaderProps) => {
  return (
    <S.EntityTableHeader>
      <div onClick={onToggleSort}>
        <span>ID</span>
        <img src={sortArrows} className="sort-arrows" alt="sort" />
      </div>
      <div>
        <span>Name</span>
      </div>
      <div>
        <span>Class</span>
      </div>
      <div>
        <span>Subscriptions</span>
      </div>
    </S.EntityTableHeader>
  );
};

type EntityTableRowProps = {
  entityNode: EntitiesQuery_namespace_entities_nodes;
  deleteEntityNode: (entityId: string) => void;
};

const EntityTableRow: React.FC<EntityTableRowProps> = ({
  entityNode,
  deleteEntityNode,
}: EntityTableRowProps) => {
  return (
    <S.EntityTableRow>
      <span>{entityNode.id}</span>
      <span>{entityNode.metadata?.name}</span>
      <span>{entityNode.entityClass}</span>
      <span>{entityNode.subscriptions}</span>
      <S.DeleteEntity onClick={() => deleteEntityNode(entityNode.id)}>
        <img
          src={closeIcon}
          className="close-icon"
          alt="close"
          title="Delete entity"
        />
      </S.DeleteEntity>
    </S.EntityTableRow>
  );
};

export default EntitiesList;
