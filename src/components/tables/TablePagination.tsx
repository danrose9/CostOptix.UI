import React, { useState } from 'react';
import { PaginationContainer, RowCounter, PageSelector } from '../../styles/StyledPageLoader';

interface ITablePaginationProps {
  totalItems: number;
  pageSize?: number;
  handlePaginationChange: (e: any, data: any) => void;
}

const TablePagination: React.FC<ITablePaginationProps> = (props) => {
  const defaultPageSize = 10;
  const { totalItems, pageSize = defaultPageSize } = props;

  const totalPages = Math.ceil(totalItems / pageSize);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (e: any, data: any) => {
    setCurrentPage(data.activePage);

    props.handlePaginationChange(e, data);
  };

  return (
    <PaginationContainer>
      <RowCounter>
        Showing {1} to {10} of {totalItems} results
      </RowCounter>
      <PageSelector
        activePage={currentPage}
        boundaryRange={1}
        onPageChange={onPageChange}
        siblingRange={1}
        totalPages={totalPages}
        // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
        ellipsisItem={true ? undefined : null}
        firstItem={null}
        lastItem={null}
      />
    </PaginationContainer>
  );
};

export default TablePagination;
