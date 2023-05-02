import React from 'react';
import { PageContent } from './__styles__/DefaultPageStyles';
import { PageTitle } from '../components/PageTitle';

interface IDefaultPageLayoutProps {
  title: string;
}

const DefaultPageLayout = (props: IDefaultPageLayoutProps) => {
  return (
    <>
      <PageContent>
        <PageTitle title={props.title} />
      </PageContent>
    </>
  );
};

export default DefaultPageLayout;
