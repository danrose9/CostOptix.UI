import React, { useEffect, useState } from 'react';
import DefaultTable from '../tables/DefaultTable';
import PageWrapper from './PageWrapper';
import ResourcesTable from './resource-view/ResourceTable';
import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';
import { IRootState } from '../../services/redux/rootReducer';
import SearchResources from '../search/SearchResources';
import { PageSizeProvider } from '../tables/PageSizeContext';

const TestPage = () => {
  const resources = useSelector((state: IRootState) => state[reduxState.RESOURCES]);
  const [skip, setSkip] = useState(0);

  return (
    <PageSizeProvider>
      <PageWrapper title={'Resource View'}>
        <DefaultTable
          title="Resources"
          description="A complete list of all resources across each of your service providers."
          showPagination={true}
          showSearch={true}
          children={<ResourcesTable searchResults={resources.searchResults} />}
          totalItems={resources.count}
          searchFunction={
            <SearchResources
              skip={skip}
              initialQuery={''}
              isAvailable={resources.isAvailable}
              exportToCSV={false}
              // resetPage={resetPage}
            />
          }
        />
      </PageWrapper>
    </PageSizeProvider>
  );
};

export default TestPage;
