import React, { useState } from 'react';
import { SearchDocumentsResponseType } from 'src/types/document-types';
import { useSearchDocuments } from 'src/hooks/index';
import { BLOGS } from 'src/services/api/apiEndpoints';
import HelpCenterBanner from '../HelpCenterBanner';
import SearchDocument from '../search/SearchDocument';
import * as images from '../../assets/index';
import BlogSection from './BlogSection';
import DocumentPagination from '../pagination/DocumentPagination';
import { PaginationProps } from 'semantic-ui-react';

const TITLE = 'Blog';
const STRAPLINE = 'Insights and Inspiration: Your Daily Dose of Knowledge and Creativity';

interface IBlogProps {}

const Blogs: React.FC<IBlogProps> = () => {
  const [searchString, setSearchString] = useState(' ');
  const [skip, setSkip] = useState(0);
  const top = 10;
  const searchResponse: SearchDocumentsResponseType = useSearchDocuments({
    search: searchString,
    top: top,
    skip: skip,
    endpoint: BLOGS,
  });

  const SupportHeaderContent = () => (
    <SearchDocument placeholder="Search Blogs" options={searchResponse.documents} setSearchString={setSearchString} />
  );

  const handlePageChange = (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) => {
    setSkip((data.activePage as number) * top - 10);
  };

  const totalCount = searchResponse.documents?.totalCount || 0;

  return (
    <>
      <HelpCenterBanner
        className="min-left-padding"
        heading={TITLE}
        strapline={STRAPLINE}
        content={<SupportHeaderContent />}
        image={images.BLOG}
      />
      <BlogSection blogs={searchResponse.documents} />
      {totalCount <= top ? null : (
        <DocumentPagination
          totalDocuments={totalCount}
          isLoading={searchResponse.isLoading}
          handlePageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default Blogs;
