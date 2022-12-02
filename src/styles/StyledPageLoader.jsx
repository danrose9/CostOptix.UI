import { Pagination } from 'semantic-ui-react';
import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

export const RowCounter = styled.div`
  font-size: 1.1rem;
`;

export const PageSelector = styled(Pagination)`
  border: 10px;
`;