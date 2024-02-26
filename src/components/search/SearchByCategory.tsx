import _ from 'lodash';
import React, { useState, useCallback, useEffect } from 'react';
import SearchInput from './SearchInput';

interface Option {
  id: string;
  adoFilePath: string;
  title: string;
  lastUpdatedDate: string;
  category: string;
  tags: string[] | null;
  summary: string;
  htmlContent: null;
}

export interface Documents {
  [key: string]: {
    name: string;
    results: Option[];
  };
}

interface SearchState {
  isLoading: boolean;
  results: any;
  value: string;
}

interface ISearchByCategoryProps {
  placeholder?: string;
  options: Documents;
  setSearchString?: (searchString: string) => void;
}

const initialState: SearchState = { isLoading: false, results: {}, value: '' };

const SearchByCategory: React.FC<ISearchByCategoryProps> = ({ placeholder, options, setSearchString }) => {
  const [state, setState] = useState<SearchState>(initialState);

  const handleResultSelect = useCallback((e: any, { result }: { result: Option }) => {
    setState((prevState) => ({ ...prevState, value: result.title }));
  }, []);

  const handleSearchChange = useCallback((e: any, { value }: { value: string }) => {
    setState((prevState) => ({ ...prevState, isLoading: true, value }));

    setTimeout(() => {
      if (value.length < 1) {
        setState(initialState);
        return;
      }

      const re = new RegExp(_.escapeRegExp(value), 'i');
      const isMatch = (result: Option) => re.test(result.title);

      const filteredResults = _.reduce(
        options,
        (memo, data, name) => {
          const results = _.filter(data.results, isMatch);
          if (results.length) memo[name] = { name, results };

          return memo;
        },
        {} as Documents
      );

      setState({
        isLoading: false,
        results: filteredResults,
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

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      debouncedSearchChange.cancel();
    };
  }, [debouncedSearchChange]);

  return (
    <SearchInput
      placeholder={placeholder}
      category
      loading={state.isLoading}
      onResultSelect={handleResultSelect}
      onSearchChange={onSearchChange}
      results={state.results}
      value={state.value}
    />
  );
};

export default SearchByCategory;
