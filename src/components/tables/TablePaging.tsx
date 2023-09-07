import React, { useEffect, useState } from 'react';
import { PaginationContainer, RowCounter, PageSelector } from '../../styles/StyledPageLoader';
import { searchQuery } from '../../services/api/searchQuery';

interface ITablePagingProps {
  totalPages: number;
  totalResults: number;
  pageSize: number;
  isLoading: boolean;
  searchValue?: null | undefined;
}

export const TablePaging: React.FC<ITablePagingProps> = (props) => {
  const { pageSize, totalResults, searchValue, isLoading } = props;

  const [activePage, setActivePage] = useState(1);
  const lastItemInPage = pageSize * activePage;

  const lastItem = () => {
    if (lastItemInPage >= totalResults) {
      return totalResults;
    } else return lastItemInPage;
  };

  const firstItem = lastItemInPage - (pageSize - 1);
  const totalPages = Math.ceil(totalResults / pageSize);

  const handlePaginationChange = (e: any, data: any) => {
    setActivePage(Math.ceil(data.activePage));
    searchQuery(activePage, searchValue, pageSize);
  };

  return (
    <PaginationContainer>
      {totalResults === 0 ? (
        <>
          <RowCounter>Showing {totalResults} results</RowCounter>
        </>
      ) : (
        <>
          <RowCounter>
            Showing {firstItem} to {lastItem()} of {totalResults} results
          </RowCounter>

          <PageSelector
            activePage={activePage}
            totalPages={totalPages}
            firstItem={null}
            lastItem={null}
            ellipsisItem={undefined}
            disabled={isLoading}
            onPageChange={handlePaginationChange}
          />
        </>
      )}
    </PaginationContainer>
  );
};
