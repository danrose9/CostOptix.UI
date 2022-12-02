import styled from 'styled-components';
import { Table } from 'semantic-ui-react';

export const StyledTableCell = styled(Table.Cell)`
  &&& {
    text-align: center;
  }
`;

export const StyledHeaderCell = styled(Table.HeaderCell)`
  cursor: pointer!important;
`;

export const StyledTableRow = styled(Table.Row)`
  cursor: pointer;
`;