import React, { ReactNode } from 'react';
import { PageContent } from './__styles__/DefaultPageStyles';
import { PageHeader } from '../components/PageHeader';

interface IPageLayoutProps {
  title: string;
  children?: ReactNode;
}

const PageLayout = (props: IPageLayoutProps) => {
  const { title, children } = props;
  return (
    <>
      <PageContent>
        <PageHeader title={title} />
        {children}
      </PageContent>
    </>
  );
};

export default PageLayout;
