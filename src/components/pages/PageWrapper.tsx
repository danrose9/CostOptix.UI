import React, { ReactNode } from 'react';
import { PageHeader } from '../PageHeader';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { ActionButton } from '../buttons';
import { useIsDemo } from '../hoc/withDemo';

interface IPageLayoutProps {
  title?: string | undefined;
  children?: ReactNode;
  className?: string;
  searchComponent?: React.ReactNode;
  downloadComponent?: boolean;
  onClick?: () => void;
}

const PageContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

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

const PageWrapper: React.FC<IPageLayoutProps> = ({ title, children, searchComponent, downloadComponent, onClick }) => {
  const isDemo = useIsDemo();
  return (
    <PageContainer>
      <PageHeaderContainer>
        <PageHeader title={title} />
        <PageActionBar>
          {isDemo ? null : (
            <ActionButtons>
              {downloadComponent ? (
                <ActionButton
                  name="download"
                  color="blue"
                  tooltip="download"
                  tooltipPosition="bottom left"
                  onClick={onClick}
                />
              ) : null}
            </ActionButtons>
          )}
          {searchComponent ? searchComponent : null}
        </PageActionBar>
      </PageHeaderContainer>
      {children}
    </PageContainer>
  );
};

export default PageWrapper;
