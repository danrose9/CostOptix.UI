import React, { useEffect, useRef, useCallback, useContext } from 'react';
import _ from 'lodash';
import { searchReducer, initialState } from '../../reducers/searchReducer';
import SearchInput from './SearchInput';
import { DocumentData } from 'src/types/document-types';
import { Document } from 'src/types/document-types';
import { DocumentContext } from '../help-center/DocumentContext';

interface ISearchDocumentProps {
  placeholder?: string;
  setSearchString: (searchString: string) => void;
  options: DocumentData;
}

/*
This works but it's very clanky and could be improved a lot. The 
searchReducer should be responsible for triggering the fetch and updating 
state inside the reducer. 

This component should just read state.

Move 'options' and 'setSearchString' indside the reducer and set results
to read state.results

*/
const SearchDocument: React.FC<ISearchDocumentProps> = ({ placeholder, options, setSearchString }) => {
  const [state, dispatch] = React.useReducer(searchReducer, initialState);
  const { loading, value } = state;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Wrap getResults in useCallback to prevent it from being recreated on every render
  const getResults = useCallback(() => {
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
  }, [options?.data]); // Add options?.data as a dependency

  const { setDocumentId, setCategory } = useContext(DocumentContext);

  const handleResultSelect = useCallback(
    (e: any, { result }: { result: Document }) => {
      const handleSelect = (id: string, category: string) => {
        setDocumentId(id);
        setCategory(category);
        // console.log('Selected Document: ', result);
      };

      handleSelect(result.id, result.category);
      dispatch({ type: 'UPDATE_SELECTION', selection: result.title });
    },
    [setDocumentId, setCategory]
  );

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
          results: getResults(), // This now references the memoized version
        });
      }, 300);
    },
    // Ensure getResults is included in the dependency array
    [setSearchString, getResults]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <SearchInput
        category
        placeholder={placeholder}
        loading={loading}
        onResultSelect={handleResultSelect}
        onSearchChange={handleSearchChange}
        results={getResults()} // This now references the memoized version
        value={value}
      />
    </>
  );
};

export default SearchDocument;
