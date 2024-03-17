import React from 'react';
import { Segment, SemanticCOLORS } from 'semantic-ui-react';
import {
  TableContainer,
  TableWrapper,
  TableFooter,
  TableHeader,
  TableTitle,
  TableDescription,
} from './DefaultTableStyles';
import TablePagination from './TablePagination';
import TableActionBar from './TableActionBar';
import TableHeaderOptions from './TableHeaderOptions';
import { Loader } from '../Loader';

interface DefaultTableProps {
  title?: string;
  description?: string;
  color?: SemanticCOLORS | undefined;
  children?: React.ReactNode;
  showPagination?: boolean;
  showSearch?: boolean;
  searchFunction?: React.ReactNode;
  totalItems: number;
  isLoading?: boolean;
  handleExportToCSV?: (arg0: boolean) => void;
}

const DefaultTable: React.FunctionComponent<DefaultTableProps> = ({
  title,
  color = 'purple',
  description,
  children,
  showSearch,
  searchFunction,
  showPagination,
  totalItems,
  isLoading,
  handleExportToCSV,
}) => {
  return (
    <TableContainer>
      <Segment color={color}>
        <TableHeader>
          <div>
            <TableTitle>{title}</TableTitle>
            <TableDescription>{description}</TableDescription>
          </div>
          <TableHeaderOptions handleExportToCSV={handleExportToCSV} />
        </TableHeader>

        <TableActionBar showSearch={showSearch} searchFunction={searchFunction} />

        {isLoading ? <Loader /> : <TableWrapper>{children}</TableWrapper>}
        <TableFooter>{showPagination ? <TablePagination totalItems={totalItems}></TablePagination> : null}</TableFooter>
      </Segment>
    </TableContainer>
  );
};

export default DefaultTable;
