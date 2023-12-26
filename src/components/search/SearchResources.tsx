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
import { usePagination } from '../tables/PaginationContext';

const keyDelay = parseInt(process.env.REACT_APP_KEY_DELAY || '300');

interface ISearchResourcesProps {
  initialQuery: string;
  isAvailable?: boolean;
  exportToCSV?: boolean;
  onExportComplete: () => void;
}

const SearchResources: React.FC<ISearchResourcesProps> = ({ initialQuery, exportToCSV, onExportComplete }) => {
  const dispatch = useDispatch();

  const { pageSize, skip, setSkip, setActivePage } = usePagination();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  let { searchValue } = useSelector((state: IRootState) => state[reduxState.RESOURCES]);

  const executeSearch = useCallback(
    (searchValue: string, pageSize: number, skip?: number, exportToCSV?: boolean) => {
      const query = queryBuilder(searchValue, pageSize, skip, exportToCSV);

      timeoutRef.current = setTimeout(async () => {
        await dispatch<AppDispatch>(SEARCH_RESOURCES(query));

        // reset exportToCSV to false after export is complete
        onExportComplete();
      }, keyDelay);
    },
    [dispatch, onExportComplete]
  );

  const handleSearchChange = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>, data: any) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Reset skip and active page on new search
      setSkip(0);
      setActivePage(1);

      const newSearchValue = data.value;
      if (searchValueRef.current !== newSearchValue) {
        dispatch(SEARCH_CLICK(newSearchValue));
        searchValueRef.current = newSearchValue;
      }
    },
    [dispatch, setSkip, setActivePage]
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
