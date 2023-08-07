import React, { useState } from 'react';
import PageLayout from '../PageLayout';
import styled, { css } from 'styled-components';
import { Table, Segment, Dropdown } from 'semantic-ui-react';
import CostContainerTable from './CostContainerTable';
import CostContainerDetail from './CostContainerDetail';
import { containers } from './containerTestData';

interface ContainerProps {
  selected?: boolean;
  expandContainer: () => void;
}

const ComponentContainer = styled.div`
  display: flex;
  padding: 0.5em 0 1em;
`;

const CostContainersList = styled.div`
  //   flex-basis: 70%;
`;

const ContainerDetail = styled.div`
  //   flex-basis: 30%;
`;

interface ICostContainerPage {}

const CostContainerPage: React.FC<ICostContainerPage> = (props) => {
  const [selectedCostContainer, setSelectedCostContainer] = useState<any>(containers[0]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const selectContainerDetail = (container: any) => {
    setSelectedCostContainer(container);
  };

  const expandContainer = (component: string) => {
    setSelectedComponent(component);
  };

  return (
    <PageLayout title="Cost Containers">
      <ComponentContainer>
        <CostContainersList style={{ width: '100%' }}>
          <CostContainerTable
            containers={containers}
            handleAddContainer={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </CostContainersList>
        {/* <ContainerDetail>
          <CostContainerDetail container={selectedCostContainer} expandContainer={expandContainer} />
        </ContainerDetail> */}
      </ComponentContainer>
    </PageLayout>
  );
};

export default CostContainerPage;
