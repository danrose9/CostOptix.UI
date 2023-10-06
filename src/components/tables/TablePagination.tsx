import React, { useState } from 'react';
import { PaginationContainer, RowCounter, PageSelector } from '../../styles/StyledPageLoader';

interface ITablePaginationProps {
  totalItems: number;
  pageSize?: number;
  handlePageChange: (e: any, data: any) => void;
  isLoading?: boolean;
}

const TablePagination: React.FC<ITablePaginationProps> = (props) => {
  const { isLoading = false } = props;
  const defaultPageSize = 10;
  const { totalItems, pageSize = defaultPageSize } = props;

  const totalPages = Math.ceil(totalItems / pageSize);
  const [currentPage, setCurrentPage] = useState(1);

  const lastItemInPage = Math.min(pageSize * currentPage, totalItems);
  const firstItemInPage = (currentPage - 1) * pageSize + 1;

  const onPageChange = (e: any, data: any) => {
    setCurrentPage(data.activePage);

    props.handlePageChange(e, data);
  };

  return (
    <PaginationContainer>
      <RowCounter>
        Showing {firstItemInPage} to {lastItemInPage} of {totalItems} results
      </RowCounter>
      <PageSelector
        activePage={currentPage}
        boundaryRange={1}
        onPageChange={onPageChange}
        siblingRange={1}
        totalPages={totalPages}
        disabled={isLoading}
        ellipsisItem={true ? undefined : null}
        firstItem={null}
        lastItem={null}
      />
    </PaginationContainer>
  );
};

export default TablePagination;
