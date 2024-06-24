import React, { useState } from 'react';
import { SearchDocumentsResponseType } from 'src/types/document-types';
import { useSearchDocuments } from 'src/hooks/index';
import { BLOGS } from 'src/services/api/apiEndpoints';
import HelpCenterBanner from '../HelpCenterBanner';
import SearchDocument from '../search/SearchDocument';
import * as images from '../../assets/index';
import BlogSection from './BlogSection';

const TITLE = 'Blog';
const STRAPLINE = 'Insights and Inspiration: Your Daily Dose of Knowledge and Creativity';

interface IBlogProps {}

const Blogs: React.FC<IBlogProps> = () => {
  const [searchString, setSearchString] = useState(' ');
  const searchResponse: SearchDocumentsResponseType = useSearchDocuments({ search: searchString, endpoint: BLOGS });

  const SupportHeaderContent = () => (
    <SearchDocument placeholder="Search Blogs" options={searchResponse.documents} setSearchString={setSearchString} />
  );

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
    </>
  );
};

export default Blogs;
