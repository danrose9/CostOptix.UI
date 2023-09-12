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

export const TableContainer = styled.div`
  padding: 0.5em;
`;

export const TableHeader = styled.div`
  display: flex;
`;

export const TableFooter = styled.div``;

export const SegmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SegmentName = styled.div`
  font-size: 1.5em;
`;

export const ScrollableTable = styled.div`
  max-height: calc(100vh - 400px);
  overflow-y: auto;
  display: block;
`;

export const StickyTableHeader = styled(Table.Header)`
  position: sticky;
  top: 0;
  z-index: 2;
`;