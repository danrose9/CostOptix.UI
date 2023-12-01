import React, { ReactNode } from 'react';
import { PageContent } from '../__styles__/DefaultPageStyles';
import { PageHeader } from '../PageHeader';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { ActionButton } from '../buttons';

interface IPageLayoutProps {
  title: string;
  children?: ReactNode;
  className?: string;
  searchComponent?: React.ReactNode;
  downloadComponent?: boolean;
}

const PageHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PageActionBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ActionButtons = styled(Icon.Group)`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const PageLayout = (props: IPageLayoutProps) => {
  const { title, children, searchComponent, downloadComponent } = props;
  return (
    <>
      <PageContent>
        <PageHeaderContainer>
          <PageHeader title={title} />
          <PageActionBar>
            <ActionButtons>
              {downloadComponent ? (
                <ActionButton name="download" color="blue" tooltip="download" tooltipPosition="bottom left" />
              ) : null}
            </ActionButtons>
            {searchComponent ? searchComponent : null}
          </PageActionBar>
        </PageHeaderContainer>
        {children}
      </PageContent>
    </>
  );
};

export default PageLayout;
