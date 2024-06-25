import * as React from 'react';
import { Pagination, PaginationProps } from 'semantic-ui-react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  padding-bottom: 2em;
  display: flex;
  justify-content: center;
`;

interface IDocumentPaginationProps {
  totalDocuments: number;
  handlePageChange: (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) => void;
  isLoading?: boolean;
}

const DocumentPagination: React.FunctionComponent<IDocumentPaginationProps> = (props) => {
  const { isLoading, totalDocuments, handlePageChange } = props;

  var totalPages = Math.ceil(totalDocuments / 10);

  return (
    <>
      <PaginationContainer>
        <Pagination
          boundaryRange={0}
          defaultActivePage={1}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          disabled={isLoading}
        />
      </PaginationContainer>
    </>
  );
};

export default DocumentPagination;
