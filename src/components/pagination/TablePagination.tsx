import React from 'react';
import { PaginationProps } from 'semantic-ui-react';
import { PaginationContainer, RowCounter, PageSelector } from '../../styles/StyledPageLoader';
import { usePagination } from '../tables/PaginationContext';

interface ITablePaginationProps {
  totalItems: number;
  handlePageChange?: (e: React.ChangeEvent<HTMLInputElement>, data: PaginationProps) => void;
  isLoading?: boolean;
}

export const TablePagination: React.FC<ITablePaginationProps> = ({ totalItems, isLoading = false, ...props }) => {
  const { pageSize, setSkip, activePage, setActivePage } = usePagination();

  const totalPages = Math.ceil(totalItems / pageSize);
  const lastItemInPage = Math.min(pageSize * activePage, totalItems);
  const firstItemInPage = (activePage - 1) * pageSize + 1;

  const onPageChange = (e: React.ChangeEvent<HTMLInputElement>, data: PaginationProps) => {
    const newActivePage = data.activePage as number;
    const newSkip = (newActivePage - 1) * pageSize;

    setActivePage(newActivePage);
    setSkip(newSkip);

    props.handlePageChange && props.handlePageChange(e, data);
  };

  return (
    <PaginationContainer>
      <RowCounter>
        Showing {firstItemInPage} to {lastItemInPage} of {totalItems} results
      </RowCounter>
      <PageSelector
        activePage={activePage}
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
