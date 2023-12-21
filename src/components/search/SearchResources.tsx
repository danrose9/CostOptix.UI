import React, { useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_CLICK } from '../../services/redux/reducers/resourceSlice';
import { reduxState } from '../../services/redux/reduxState';
import { SEARCH_RESOURCES } from '../../services/redux/thunks/resourceThunk';
import { IRootState } from '../../services/redux/rootReducer';
import { AppDispatch } from '../../services/redux/store';
import { SEARCH } from './searchKeywords';
import { queryBuilder } from './queryBuilder';
import SearchInput from './SearchInput';
import { usePageSize } from '../tables/PageSizeContext';

const keyDelay = parseInt(process.env.REACT_APP_KEY_DELAY || '300');

interface ISearchResourcesProps {
  skip?: number;
  initialQuery: string;
  pageSize?: number;
  isAvailable?: boolean;
  exportToCSV?: boolean;
  resetPage?: () => void;
}

const SearchResources: React.FC<ISearchResourcesProps> = ({ skip, initialQuery, exportToCSV, resetPage }) => {
  const dispatch = useDispatch();

  const { pageSize } = usePageSize();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  let { searchValue } = useSelector((state: IRootState) => state[reduxState.RESOURCES]);

  const executeSearch = useCallback(
    (searchValue: string, pageSize: number, skip?: number, exportToCSV?: boolean) => {
      const query = queryBuilder(searchValue, pageSize, skip, exportToCSV);
      if (exportToCSV) {
      }
      timeoutRef.current = setTimeout(() => {
        dispatch<AppDispatch>(SEARCH_RESOURCES(query));
      }, keyDelay);
    },
    [dispatch]
  );

  const handleSearchChange = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>, data: any) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // this prevents hidden search results if the page selected is more than the subsequent search
      if (skip && skip > 0) {
        resetPage && resetPage();
      }

      const newSearchValue = data.value;
      if (searchValueRef.current !== newSearchValue) {
        dispatch(SEARCH_CLICK(newSearchValue));
        searchValueRef.current = newSearchValue;
      }
    },
    [dispatch, skip, resetPage]
  );

  const searchValueRef = useRef<string>(initialQuery);

  useEffect(() => {
    executeSearch(searchValue, pageSize, skip, exportToCSV);
  }, [executeSearch, pageSize, searchValue, skip, exportToCSV]);

  return (
    <SearchInput
      placeholder={SEARCH.PLACEHOLDER}
      onSearchChange={handleSearchChange}
      value={searchValue}
      showNoResults={false}
    />
  );
};

export default SearchResources;
