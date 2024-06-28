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

const Blogs = () => {
  const [searchString, setSearchString] = useState('');

  const top = 50;
  const fetchBlogs: SearchDocumentsResponseType = useSearchDocuments({
    search: searchString,
    top: top,
    skip: 0,
    endpoint: BLOGS,
  });

  return (
    <>
      <HelpCenterBanner
        className="min-left-padding"
        heading={TITLE}
        strapline={STRAPLINE}
        content={
          // <SearchDocument placeholder="Search Blogs" options={fetchBlogs.documents} setSearchString={setSearchString} />
          null
        }
        image={images.BLOG}
      />
      <BlogSection />
    </>
  );
};

export default Blogs;
