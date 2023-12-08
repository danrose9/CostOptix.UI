import React, { useState, useEffect } from 'react';
import { Divider, PaginationProps } from 'semantic-ui-react';
import { Spinner } from '../../Loader';
import { useSelector } from 'react-redux';
import { reduxState } from '../../../services/redux/reduxState';
import { IRootState } from '../../../services/redux/rootReducer';
import { SEARCH } from '../../search/searchKeywords';
import ResourcesTable from './ResourceTable';
import TablePagination from '../../tables/TablePagination';
import PageLayout from '../PageLayout';
import SearchResources from '../../search/SearchResources';

const pageSize = 10;

const ResourceList = () => {
  const [skip, setSkip] = useState(0);
  const initialQuery = `?$${SEARCH.TOP}=${pageSize}&$${SEARCH.SKIP}=${skip}`;
  const resources = useSelector((state: IRootState) => state[reduxState.RESOURCES]);

  const [exportToCSV, setExportToCSV] = useState(false);

  const resetPage = () => {
    setSkip(0);
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>, data: PaginationProps) => {
    const skipCount = ((data.activePage as number) - 1) * 10;

    setSkip(skipCount);
  };

  const handleOnClick = () => {
    setExportToCSV(true);
  };

  useEffect(() => {
    if (exportToCSV) {
      setExportToCSV(false);
    }
  }, [exportToCSV]);

  return (
    <>
      <PageLayout
        title="Resources"
        searchComponent={
          <SearchResources
            skip={skip}
            initialQuery={initialQuery}
            pageSize={pageSize}
            isAvailable={resources.isAvailable}
            exportToCSV={exportToCSV}
            resetPage={resetPage}
          />
        }
        downloadComponent={true}
        onClick={handleOnClick}
      >
        {resources.isLoading ? <Spinner /> : <ResourcesTable searchResults={resources.searchResults} />}

        <Divider />
        <TablePagination totalItems={resources.count} pageSize={pageSize} handlePageChange={handlePageChange} />
      </PageLayout>
    </>
  );
};

export default ResourceList;
