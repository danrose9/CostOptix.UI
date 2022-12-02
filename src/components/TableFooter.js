import React, { useState } from 'react';
import {
  PaginationContainer,
  RowCounter,
  PageSelector,
} from '../styles/StyledPageLoader';
import { searchQuery } from '../services/api/searchQuery';

export const TableFooter = (props) => {
  const [activePage, setActivePage] = useState(1);
  const lastItemInPage = props.pageSize * activePage;

  const lastItem = () => {
    if (lastItemInPage >= props.totalResults) {
      return props.totalResults;
    } else return lastItemInPage;
  };

  const firstItem = lastItemInPage - (props.pageSize - 1);
  const totalPages = Math.ceil(props.totalResults / props.pageSize);

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(Math.ceil(activePage));
    searchQuery(activePage, props.searchValue, props.pageSize);
  };

  return (
    <PaginationContainer>
      {props.totalResults === 0 ? (
        <>
          <RowCounter>Showing {props.totalResults} results</RowCounter>
        </>
      ) : (
        <>
          <RowCounter>
            Showing {firstItem} to {lastItem()} of {props.totalResults} results
          </RowCounter>
          Page {activePage}
          <PageSelector
            activePage={activePage}
            totalPages={totalPages}
            firstItem={null}
            lastItem={null}
            ellipsisItem={undefined}
            disabled={props.isLoading}
            onPageChange={handlePaginationChange}
          />
        </>
      )}
    </PaginationContainer>
  );
};
