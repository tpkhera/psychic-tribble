import styled from "styled-components";

export const EntityTable = styled.div`
  background-color: #ffffff;
  border-radius: 1rem;
  flex: 5;
  max-height: 70vh;
  min-width: 40vw;
  overflow: auto;
  box-shadow: 3px 1px 10px 10px #f3f3f3;
`;

export const DeleteEntity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  font-weight: 700;
  opacity: 0;
  cursor: pointer;
  transition: all 0.2s ease-in;
  margin-right: 1rem;
`;

export const EntityTableRow = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 2px solid #f4f6f8;
  position: relative;
  span {
    flex: 1;
    text-align: left;
  }
  span:nth-child(1) {
    flex: 2;
  }
  &:hover {
    ${DeleteEntity} {
      opacity: 0.4;
    }
  }
`;

export const EntityTableHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  font-size: 0.9rem;
  font-weight: 700;
  input {
    opacity: 0;
    pointer-events: none;
    margin: 0 1rem;
  }
  div {
    flex: 1;
    text-align: left;
  }
  div:nth-child(1) {
    flex: 2;
  }
  .sort-arrows {
    height: 0.5rem;
    margin-left: 0.5rem;
  }
`;

export const EntityTableCell = styled.div`
  flex: 1;
`;

export const SearchInputContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #f4f6f8;
`;

export const SearchInput = styled.input`
  border-radius: 0.5rem;
  border: 2px solid #f4f6f8;
  padding: 1rem;
  margin: 1rem;
  flex: 1;
  outline: none;
`;

export const EmptyTable = styled.div`
  font-size: 2rem;
  color: #aaa;
  margin: 2rem 0;
  text-align: center;
`;
