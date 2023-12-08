import React, { useState } from 'react';
import { PaginationProps } from 'semantic-ui-react';
import { PaginationContainer, RowCounter, PageSelector } from '../../styles/StyledPageLoader';

const defaultPageSize = 10;

interface ITablePaginationProps {
  totalItems: number;
  pageSize?: number;
  handlePageChange: (e: React.ChangeEvent<HTMLInputElement>, data: PaginationProps) => void;
  isLoading?: boolean;
}

const TablePagination: React.FC<ITablePaginationProps> = (props) => {
  const { totalItems, pageSize = defaultPageSize, isLoading = false } = props;

  const [pageState, setPageState] = useState({
    currentPage: 1,
    skip: 0,
  });

  const totalPages = Math.ceil(totalItems / pageSize);
  const lastItemInPage = Math.min(pageSize * pageState.currentPage, totalItems);
  const firstItemInPage = (pageState.currentPage - 1) * pageSize + 1;

  const onPageChange = (e: React.ChangeEvent<HTMLInputElement>, data: PaginationProps) => {
    const skip = ((data.activePage as number) - 1) * 10;

    setPageState((prevState) => ({
      ...prevState,
      currentPage: data.activePage as number,
      skip: skip,
    }));

    props.handlePageChange(e, data);
  };

  return (
    <PaginationContainer>
      <RowCounter>
        Showing {firstItemInPage} to {lastItemInPage} of {totalItems} results
      </RowCounter>
      <PageSelector
        activePage={pageState.currentPage}
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
