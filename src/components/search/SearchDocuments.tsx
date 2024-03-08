import _ from 'lodash';
import React, { useRef, useEffect, useState } from 'react';
import { GridColumn, Search, Grid, Header, Segment } from 'semantic-ui-react';

const initialState = {
  loading: false,
  results: [],
  value: '',
};

function searchReducer(state: any, action: any) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      console.log('CLEAN_QUERY.action', action);
      return initialState;
    case 'START_SEARCH':
      console.log('START_SEARCH.action.query', action.query);
      return { ...state, loading: true, value: action.query };
    case 'FINISH_SEARCH':
      console.log('FINISH_SEARCH.action.results', action.results);
      return { ...state, loading: false, results: action.results };
    case 'UPDATE_SELECTION':
      console.log('UPDATE_SELECTION.action.selection', action.selection);
      return { ...state, value: action.selection };

    default:
      throw new Error();
  }
}
interface SearchState {
  isLoading: boolean;
  results: any;
  value: string;
}

interface ISearchDocumentsProps {
  options: any;
  placeholder: string;
  setSearchString: (searchString: string) => void;
}

const SearchDocuments: React.FC<ISearchDocumentsProps> = ({ options, placeholder, setSearchString }) => {
  const [state, dispatch] = React.useReducer(searchReducer, initialState);

  const { loading, results, value } = state;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleResultSelect = React.useCallback((e: any, { result }: { result: any }) => {
    dispatch({ type: 'UPDATE_SELECTION', selection: result.title });
  }, []);

  const handleSearchChange = React.useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>, data: any) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    dispatch({ type: 'START_SEARCH', query: data.value });

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' });
        return;
      }
      // setSearchString(data.value);

      dispatch({
        type: 'FINISH_SEARCH',
        results: options,
      });
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // useEffect(() => {
  //   console.log('options', options);
  // }, [options]);

  return (
    <Grid>
      <GridColumn width={6}>
        <Search
          loading={loading}
          placeholder={placeholder}
          onResultSelect={handleResultSelect}
          onSearchChange={handleSearchChange}
          results={results}
          value={value}
        />
      </GridColumn>
    </Grid>
  );
};

export default SearchDocuments;
