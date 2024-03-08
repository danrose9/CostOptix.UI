import _ from 'lodash';
import React, { useState, useCallback, useEffect } from 'react';
import SearchInput from './SearchInput';
import { DocumentType, Documents } from '../../services/api/fetchDocs';
import { Search } from 'semantic-ui-react';

interface SearchState {
  isLoading: boolean;
  results: any;
  value: string;
}

interface ISearchByCategoryIdProps {
  placeholder?: string;
  options: Documents;
  setSearchString?: (searchString: string) => void;
  setSelectedId?: (selectedId: string) => void;
}

const initialState: SearchState = { isLoading: false, results: {}, value: '' };

const SearchByCategoryId: React.FC<ISearchByCategoryIdProps> = ({
  placeholder,
  options,
  setSearchString,
  setSelectedId,
}) => {
  const [state, setState] = useState<SearchState>(initialState);

  const handleResultSelect = useCallback((e: any, { result }: { result: DocumentType }) => {
    setState((prevState) => ({ ...prevState, value: result.title }));
    setSelectedId && setSelectedId(result.id);
  }, []);

  const handleSearchChange = useCallback((e: any, { value }: { value: string }) => {
    setState((prevState) => ({ ...prevState, isLoading: true, value }));

    setTimeout(() => {
      if (value.length < 1) {
        setState(initialState);
        return;
      }

      setState({
        isLoading: false,
        results: options.documents,
        value,
      });
    }, 300);
  }, []);

  const debouncedSearchChange = useCallback(
    _.debounce(handleSearchChange, 500, {
      leading: true,
    }),
    [handleSearchChange]
  );

  const onSearchChange = (e: React.MouseEvent<HTMLElement>, data: any) => {
    if (data.value !== undefined) {
      debouncedSearchChange(e, { value: data.value });
      if (setSearchString) setSearchString(data.value);
    }
  };

  useEffect(() => {
    console.log('SearchByCategoryId', options);
  }, [state]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      debouncedSearchChange.cancel();
    };
  }, [debouncedSearchChange]);

  return (
    <Search
      placeholder={placeholder}
      category
      loading={state.isLoading}
      onResultSelect={handleResultSelect}
      onSearchChange={onSearchChange}
      results={options}
      value={state.value}
    />
  );
};

export default SearchByCategoryId;
