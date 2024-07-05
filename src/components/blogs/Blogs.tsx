import React, { useState, useContext, useEffect } from 'react';
import { SearchDocumentsResponseType } from 'src/types/document-types';
import { useSearchDocuments } from 'src/hooks/index';
import { BLOGS } from 'src/services/api/apiEndpoints';
import HelpCenterBanner from '../HelpCenterBanner';
import SearchDocument from '../search/SearchDocument';
import * as images from '../../assets/index';
import BlogSection from './BlogSection';
import { DocumentContext } from '../context/DocumentContext';
import { useNavigate } from 'react-router-dom';
import * as appRoutes from 'src/app/router/appRoutes';

const TITLE = 'Blog';
const STRAPLINE = 'Insights and Inspiration: Your daily dose of knowledge and creativity';

const Blogs = () => {
  const [searchString, setSearchString] = useState('');
  const { documentId } = useContext(DocumentContext);
  const navigate = useNavigate();

  const top = 50;
  const fetchBlogs: SearchDocumentsResponseType = useSearchDocuments({
    search: searchString,
    top: top,
    skip: 0,
    endpoint: BLOGS,
  });

  useEffect(() => {
    if (documentId) {
      // Check if documentId is not empty
      navigate(`${appRoutes.BLOGS}/${documentId}`);
      console.log(`${appRoutes.BLOGS}/${documentId}`);
    }
  }, [documentId, navigate]);

  return (
    <>
      <HelpCenterBanner
        className="min-left-padding"
        heading={TITLE}
        strapline={STRAPLINE}
        content={
          <SearchDocument placeholder="Search Blogs" options={fetchBlogs.documents} setSearchString={setSearchString} />
        }
        image={images.BLOG}
      />
      <BlogSection />
    </>
  );
};

export default Blogs;
