import React, { useEffect, useRef, useCallback } from 'react';
import _ from 'lodash';
import { Label } from 'semantic-ui-react';
import { searchReducer, initialState } from '../../reducers/searchReducer';
import SearchInput from './SearchInput';
import { DocumentData, Documents } from 'src/services/api/fetchDocs';

const options1 = {
  sensor: {
    name: 'sensor',
    results: [
      {
        title: 'Hegmann, Ruecker and Dietrich',
        description: 'Exclusive modular workforce',
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/umurgdk/128.jpg',
        price: '$35.98',
      },
      {
        title: 'Harris - Heidenreich',
        description: 'Organized bottom-line complexity',
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/holdenweb/128.jpg',
        price: '$87.27',
      },
      {
        title: "O'Kon, VonRueden and Weber",
        description: 'Managed tertiary infrastructure',
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/otozk/128.jpg',
        price: '$93.04',
      },
      {
        title: 'Schultz Group',
        description: 'Inverse neutral model',
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/dparrelli/128.jpg',
        price: '$30.31',
      },
      {
        title: 'Kub Inc',
        description: 'Optimized analyzing local area network',
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/heykenneth/128.jpg',
        price: '$19.37',
      },
    ],
  },
  interface: {
    name: 'interface',
    results: [
      {
        title: 'Smitham - Spencer',
        description: 'Face to face web-enabled Graphical User Interface',
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/maximsorokin/128.jpg',
        price: '$69.01',
      },
      {
        title: 'Adams - Labadie',
        description: 'Up-sized system-worthy challenge',
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/kevinoh/128.jpg',
        price: '$88.69',
      },
      {
        title: 'Schinner - Frami',
        description: 'Total non-volatile task-force',
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/maiklam/128.jpg',
        price: '$53.71',
      },
      {
        title: 'Howe LLC',
        description: 'Persistent real-time throughput',
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/jeremiespoken/128.jpg',
        price: '$44.72',
      },
      {
        title: 'Doyle, Graham and Goyette',
        description: 'Public-key tangible flexibility',
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/mattbilotti/128.jpg',
        price: '$86.20',
      },
    ],
  },
};

const options2 = {
  'Legal & Compliance': {
    name: 'Legal & Compliance',
    documents: [
      {
        id: '65c8cdbe67367cae14bbabba',
        adoFilePath: '/home/vsts/work/1/a/docs/External-Docs/Terms-and-Conditions.md',
        title: 'Terms and Conditions',
        lastUpdatedDate: '2024-02-13T09:28:38.975Z',
        category: 'Legal & Compliance',
        tags: null,
        summary: 'Terms and Conditions of use',
        htmlContent: null,
      },
    ],
  },
  'Account & Setup': {
    name: 'Account & Setup',
    documents: [
      {
        id: '65c8cdbe67367cae14bbabbb',
        adoFilePath: '/home/vsts/work/1/a/docs/External-Docs/User-Guides/Add-Azure-Service-Connection.md',
        title: 'Add an Azure Service Connection',
        lastUpdatedDate: '2024-02-13T09:28:39.216Z',
        category: 'Account & Setup',
        tags: null,
        summary: 'Add an Azure service connection so that CostOptix can collect Azure usage data',
        htmlContent: null,
      },
    ],
  },
  'Cost Containers': {
    name: 'Cost Containers',
    documents: [
      {
        id: '65c8cdbe67367cae14bbabbc',
        adoFilePath: '/home/vsts/work/1/a/docs/External-Docs/User-Guides/Working-With-Cost-Containers.md',
        title: 'How to create a new Cost Container',
        lastUpdatedDate: '2024-02-13T09:28:39.396Z',
        category: 'Cost Containers',
        tags: null,
        summary: 'How to create a new Cost Container to report on resources across providers into a virtual group',
        htmlContent: null,
      },
    ],
  },
};

// const resultRenderer = ({ title }: any) => <Label content={title} key={title} />;

interface ISearchProps {
  placeholder?: string;
  setSearchString: (searchString: string) => void;
  options: DocumentData;
}

const Search: React.FC<ISearchProps> = ({ placeholder, options, setSearchString }) => {
  const [state, dispatch] = React.useReducer(searchReducer, initialState);
  const { loading, documents, value } = state;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // const handleResultSelect = useCallback((e: any, { result }: { result: Document }) => {
  //   dispatch({ type: 'UPDATE_SELECTION', selection: result.title });
  // }, []);

  // const source = _.range(0, 3).reduce((memo: { [key: string]: any }) => {
  //   const name = 'category';

  //   memo[name] = {
  //     name,
  //     results: 'document',
  //   };

  //   return memo;
  // }, {});

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

        // const filteredResults = _.reduce(
        //   options.data,
        //   (memo, data, name) => {
        //     const results = _.filter(data.results, isMatch);

        //     if (results.length) memo[name] = { name, results };

        //     return memo;
        //   },
        //   {} as Documents
        // );

        // console.log('filteredResults', filteredResults);
        dispatch({
          type: 'FINISH_SEARCH',
          results: options.data,
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

  useEffect(() => {
    console.log('options', options.data);
  }, [options]);
  return (
    <>
      <SearchInput
        placeholder={placeholder}
        loading={loading}
        // onResultSelect={handleResultSelect}
        onSearchChange={handleSearchChange}
        // resultRenderer={resultRenderer}
        results={options.data}
        value={value}
      />
    </>
  );
};

export default Search;
