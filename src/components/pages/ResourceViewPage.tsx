import React, { useCallback, useState } from 'react';
import DefaultTable from '../tables/DefaultTable';
import PageWrapper from './PageWrapper';
import ResourcesTable from '../resources/ResourceTable';
import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';
import { IRootState } from '../../services/redux/rootReducer';
import SearchResources from '../search/SearchResources';
import { PaginationProvider } from '../tables/PaginationContext';
import { useIsDemo } from '../hoc/withDemo';

const ResourceViewPage = () => {
  const resources = useSelector((state: IRootState) => state[reduxState.RESOURCES]);
  const [exportToCSV, setExportToCSV] = useState<boolean>(false);
  const isDemo = useIsDemo();

  const handleExportToCSV = (arg0: boolean) => {
    if (isDemo) {
      return;
    }
    setExportToCSV(arg0);
  };

  const resetExportToCSV = useCallback(() => {
    setExportToCSV(false);
  }, []);

  return (
    <PaginationProvider>
      <PageWrapper title={'Resource List'}>
        <DefaultTable
          title="Resources"
          description="A complete list of all resources across each of your service providers."
          showPagination={true}
          showSearch={true}
          children={<ResourcesTable searchResults={resources.searchResults} />}
          totalItems={resources.count}
          handleExportToCSV={handleExportToCSV}
          searchFunction={
            <SearchResources
              initialQuery={''}
              isAvailable={resources.isAvailable}
              exportToCSV={exportToCSV}
              onExportComplete={resetExportToCSV}
            />
          }
          isLoading={resources.isLoading}
        />
      </PageWrapper>
    </PaginationProvider>
  );
};

export default ResourceViewPage;
