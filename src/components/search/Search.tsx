import React, { useEffect, useRef, useCallback } from 'react';
import _ from 'lodash';
import { Label } from 'semantic-ui-react';
import { searchReducer, initialState } from '../../reducers/searchReducer';
import SearchInput from './SearchInput';

const options = [
  {
    id: '65c8cdbe67367cae14bbabb9',
    adoFilePath: '/home/vsts/work/1/a/docs/External-Docs/Privacy-Policy.md',
    title: 'Privacy Policy',
    lastUpdatedDate: '2023-09-15T00:00:00Z',
    category: 'Legal',
    tags: [],
    summary: 'The Privacy Policy for DDIWare',
    htmlContent: null,
  },
  {
    id: '65c8cdbe67367cae14bbabb8',
    adoFilePath: '/home/vsts/work/1/a/docs/External-Docs/Terms-and-Conditions.md',
    title: 'Terms and Conditions',
    lastUpdatedDate: '2024-02-23T10:08:56.926Z',
    category: 'Legal',
    tags: null,
    summary: 'The Terms and Conditions for DDIWare',
    htmlContent: null,
  },

  {
    id: '65c8cdbe67367cae14bbabbb',
    adoFilePath: '/home/vsts/work/1/a/docs/External-Docs/User-Guides/Add-Azure-Service-Connection.md',
    title: 'Add an Azure Service Connection',
    lastUpdatedDate: '2024-02-23T10:08:57.165Z',
    category: 'Setup',
    tags: null,
    summary: 'How to add an Azure Service Connection to your project',
    htmlContent: null,
  },
  {
    id: '65c8cdbe67367cae14bbabbb',
    adoFilePath: '/home/vsts/work/1/a/docs/External-Docs/User-Guides/Add-Azure-Service-Connection.md',
    title: 'Add an AWS Service Connection',
    lastUpdatedDate: '2024-01-23T10:08:57.165Z',
    category: 'Setup',
    tags: null,
    summary: 'How to add an AWS Service Connection to your project',
    htmlContent: null,
  },

  {
    id: '65c8cdbe67367cae14bbabbc',
    adoFilePath: '/home/vsts/work/1/a/docs/External-Docs/User-Guides/Working-With-Cost-Containers.md',
    title: 'Working with Cost Containers',
    lastUpdatedDate: '2024-02-23T10:08:57.361Z',
    category: 'Cost Containers',
    tags: null,
    summary: 'How to work with Cost Containers in DDIWare',
    htmlContent: null,
  },
];

const resultRenderer = ({ title }: any) => <Label content={title} key={title} />;

interface ISearchProps {
  placeholder?: string;
}

interface SearchResult {
  name: string;
  results: any[];
}

interface SearchResults {
  [key: string]: SearchResult;
}

const source = options;

const Search: React.FC<ISearchProps> = ({ placeholder }) => {
  const [state, dispatch] = React.useReducer(searchReducer, initialState);
  const { loading, results, value } = state;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleSearchChange = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>, data: any) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    dispatch({ type: 'START_SEARCH', query: data.value });

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' });
        return;
      }

      const re = new RegExp(_.escapeRegExp(data.value), 'i');
      const isMatch = (result: any) => re.test(result.title);

      dispatch({
        type: 'FINISH_SEARCH',
        results: _.filter(options, isMatch),
      });
    }, 300);
  }, []);
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current ?? undefined);
    };
  }, []);

  return (
    <>
      <SearchInput
        placeholder={placeholder}
        loading={loading}
        onResultSelect={(e, data) => dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })}
        onSearchChange={handleSearchChange}
        resultRenderer={resultRenderer}
        results={results}
        value={value}
      />
    </>
  );
};

export default Search;
