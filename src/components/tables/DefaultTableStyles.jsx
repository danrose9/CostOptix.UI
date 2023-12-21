import styled from 'styled-components';
import { Table } from 'semantic-ui-react';
import { FONT } from 'src/app/constants';

export { StyledDropDown } from '../__styles__/DropdownStyles';

export const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const TableHeaderOptions = styled.div``;

export const TableTitle = styled.h5`
  font-size: 1.1em;
  font-weight: 500;
  margin: 0;
`;

export const TableDescription = styled.p`
  margin: 0;
  font-size: 1.1em;
  color: ${FONT.TERNARY_COLOR};
`;

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
  * {
    font-family: inherit;
  }
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  * {
    color: ${FONT.SECONDARY_COLOR} !Important;
  }
`;


export const TableFooter = styled.div`
  padding: 1em 0;
* {
    color: ${FONT.SECONDARY_COLOR} !Important;
  }
`;

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

export const StyledTableHeaderCell = styled(Table.HeaderCell)`

  &.padleft {
      padding-left: 3.5em !important;
    }
`;
