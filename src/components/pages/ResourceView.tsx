import React, { useState } from 'react';
import DefaultTable from '../tables/DefaultTable';
import PageWrapper from './PageWrapper';
import ResourcesTable from './resource-view/ResourceTable';
import { useSelector } from 'react-redux';
import { reduxState } from '../../services/redux/reduxState';
import { IRootState } from '../../services/redux/rootReducer';
import SearchResources from '../search/SearchResources';
import { PaginationProvider } from '../tables/PaginationContext';

const ResourceView = () => {
  const resources = useSelector((state: IRootState) => state[reduxState.RESOURCES]);
  const [exportToCSV, setExportToCSV] = useState<boolean>(false);

  const handleExportToCSV = () => {
    setExportToCSV(true);
  };

  return (
    <PaginationProvider>
      <PageWrapper title={'Resource View'}>
        <DefaultTable
          title="Resources"
          description="A complete list of all resources across each of your service providers."
          showPagination={true}
          showSearch={true}
          children={<ResourcesTable searchResults={resources.searchResults} />}
          totalItems={resources.count}
          handleExportToCSV={handleExportToCSV}
          searchFunction={
            <SearchResources initialQuery={''} isAvailable={resources.isAvailable} exportToCSV={exportToCSV} />
          }
          isLoading={resources.isLoading}
        />
      </PageWrapper>
    </PaginationProvider>
  );
};

export default ResourceView;
