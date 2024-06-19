import React, { useState } from 'react';
import { SearchDocumentsResponseType } from 'src/types/document-types';
import { useSearchDocuments } from 'src/hooks/index';
import { DOCS } from 'src/services/api/apiEndpoints';
import HelpCenterBanner from '../HelpCenterBanner';
import SearchDocument from '../search/SearchDocument';
import * as images from '../../assets/index';
import BlogSection from './BlogSection';
import { Blog as BlogType } from 'src/types/document-types';

const TITLE = 'Blog';
const STRAPLINE = 'Insights and Inspiration: Your Daily Dose of Knowledge and Creativity';

const blogs: BlogType[] = [
  {
    id: '1',
    adoFilePath: 'path/to/file',
    title: 'Managing Azure Active Directory with PowerShell',
    createdDate: '2023-01-01',
    lastUpdatedDate: '2023-01-01',
    category: 'Azure',
    tags: ['Azure', 'Active Directory', 'AWS'],
    summary: 'This blog post discusses how to manage Azure Active Directory using PowerShell.',
    htmlContent: '<p>Managing Azure Active Directory with PowerShell is essential for automating...</p>',
    lengthInMinutes: 5,
  },
  {
    id: '2',
    adoFilePath: 'path/to/file',
    title: 'Azure DevOps: A Comprehensive Guide',
    createdDate: '2023-01-01',
    lastUpdatedDate: '2023-01-01',
    category: 'Azure',
    tags: ['Azure', 'DevOps'],
    summary: 'This blog post discusses how to use Azure DevOps for CI/CD and more.',
    htmlContent: '<p>Azure DevOps is a powerful tool for managing your CI/CD pipelines...</p>',
    lengthInMinutes: 10,
  },
  {
    id: '3',
    adoFilePath: 'path/to/file',
    title: 'Getting Started with Azure Functions',
    createdDate: '2023-01-01',
    lastUpdatedDate: '2023-01-01',
    category: 'Azure',
    tags: ['Google'],
    summary: 'This blog post discusses how to get started with Azure Functions.',
    htmlContent: '<p>Azure Functions are a great way to run small pieces of code in the cloud...</p>',
    lengthInMinutes: 7,
  },
  {
    id: '4',
    adoFilePath: 'path/to/file',
    title: 'Introduction to Azure Logic Apps',
    createdDate: '2023-01-01',
    lastUpdatedDate: '2023-01-01',
    category: 'Azure',
    tags: ['Azure', 'Logic Apps'],
    summary: 'This blog post provides an introduction to Azure Logic Apps.',
    htmlContent: '<p>Azure Logic Apps allow you to automate workflows and integrate services...</p>',
    lengthInMinutes: 8,
  },
  {
    id: '5',
    adoFilePath: 'path/to/file',
    title: 'Building a Serverless Web Application with Azure',
    createdDate: '2023-01-01',
    lastUpdatedDate: '2023-01-01',
    category: 'Azure',
    tags: ['Azure', 'Serverless'],
    summary: 'This blog post walks you through building a serverless web application on Azure.',
    htmlContent: '<p>Building a serverless web application on Azure is a great way to save costs...</p>',
    lengthInMinutes: 15,
  },
  {
    id: '6',
    adoFilePath: 'path/to/file',
    title: 'Getting Started with AWS Lambda',
    createdDate: '2023-01-01',
    lastUpdatedDate: '2023-01-01',
    category: 'AWS',
    tags: ['AWS', 'Lambda'],
    summary: 'This blog post discusses how to get started with AWS Lambda.',
    htmlContent: '<p>AWS Lambda is a serverless computing service that lets you run code without provisioning...</p>',
    lengthInMinutes: 6,
  },
];

interface IBlogProps {}

export const Blogs: React.FC<IBlogProps> = () => {
  const [searchString, setSearchString] = useState('');
  const searchResponse: SearchDocumentsResponseType = useSearchDocuments({ search: searchString, endpoint: DOCS });

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
      {/* Ensure blogs is an array */}
      <BlogSection blogs={blogs} />
    </>
  );
};

export default Blogs;
