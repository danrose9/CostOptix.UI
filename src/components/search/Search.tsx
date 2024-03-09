import React, { useEffect, useRef, useCallback } from 'react';
import { Search as SemanticSearch } from 'semantic-ui-react';
import _, { get } from 'lodash';
import { Label } from 'semantic-ui-react';
import { searchReducer, initialState } from '../../reducers/searchReducer';
import SearchInput from './SearchInput';
import { DocumentData, Documents, DataStructure } from 'src/services/api/fetchDocs';

interface ISearchProps {
  placeholder?: string;
  setSearchString: (searchString: string) => void;
  options: DocumentData;
}

const Search: React.FC<ISearchProps> = ({ placeholder, options, setSearchString }) => {
  const [state, dispatch] = React.useReducer(searchReducer, initialState);
  const { loading, documents, value, results } = state;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getResults = () => {
    return _.mapValues(options?.data, (category) => {
      return {
        name: category.name,
        results: _.map(category.documents, (doc) => ({
          title: doc.title,
          category: doc.category,
          id: doc.id,
        })),
      };
    });
  };

  // const handleResultSelect = useCallback((e: any, { result }: { result: Document }) => {
  //   dispatch({ type: 'UPDATE_SELECTION', selection: result.title });
  // }, []);

  const handleSearchChange = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>, data: any) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      dispatch({ type: 'START_SEARCH', query: data.value });

      timeoutRef.current = setTimeout(() => {
        if (data.value.length === 0) {
          dispatch({ type: 'CLEAN_QUERY' });
          return;
        }
        setSearchString(data.value);

        dispatch({
          type: 'FINISH_SEARCH',
          results: getResults(),
        });
      }, 300);
    },
    [options, setSearchString]
  );

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current ?? undefined);
    };
  }, []);

  return (
    <>
      <SemanticSearch
        category
        placeholder={placeholder}
        loading={loading}
        // onResultSelect={handleResultSelect}
        onSearchChange={handleSearchChange}
        results={getResults()}
        value={value}
      />
    </>
  );
};

export default Search;
