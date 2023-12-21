import React, { SyntheticEvent } from 'react';
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
import { usePageSize } from './PageSizeContext';

interface IDefaultTableProps {
  title?: string;
  description?: string;
  color?: SemanticCOLORS | undefined;
  children?: React.ReactNode;
  showPagination?: boolean;
  showSearch?: boolean;
  searchFunction?: React.ReactNode;
  totalItems: number;
}

const DefaultTable: React.FunctionComponent<IDefaultTableProps> = ({
  title,
  color = 'purple',
  description,
  children,
  showSearch,
  searchFunction,
  showPagination,
  totalItems,
}) => {
  const { pageSize, setPageSize } = usePageSize();

  const handlePageSizeChange = (e: SyntheticEvent<HTMLElement>, data: any) => {
    setPageSize(data.value);
  };

  return (
    <TableContainer>
      <Segment color={color}>
        <TableHeader>
          <div>
            <TableTitle>{title}</TableTitle>
            <TableDescription>{description}</TableDescription>
          </div>
          <TableHeaderOptions />
        </TableHeader>
        <TableActionBar
          showSearch={showSearch}
          searchFunction={searchFunction}
          handlePageSizeChange={handlePageSizeChange}
        />
        <TableWrapper>{children}</TableWrapper>
        <TableFooter>
          {showPagination ? (
            <TablePagination totalItems={totalItems} pageSize={pageSize} handlePageChange={() => {}}></TablePagination>
          ) : null}
        </TableFooter>
      </Segment>
    </TableContainer>
  );
};

export default DefaultTable;
