import React, { useState } from 'react';
import PageLayout from '../PageLayout';
import styled, { css } from 'styled-components';
import { Table, Segment, Dropdown } from 'semantic-ui-react';
import CostContainerTable from './CostContainerTable';
import CostContainerDetail from './CostContainerDetail';

const containers = [
  {
    name: '',
    description: '',
    created: '',
    createdBy: '',
    owner: '',
    resourceCount: 24,
    monthlyCosts: '',
    currency: '',
    providers: [],
    data: [],
  },
];

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

interface ICostContainerPage {
  // Define the prop types here
}

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
        <CostContainersList>
          <CostContainerTable containers={containers} selectContainerDetail={selectContainerDetail} />
        </CostContainersList>
        {/* <ContainerDetail>
          <CostContainerDetail container={selectedCostContainer} expandContainer={expandContainer} />
        </ContainerDetail> */}
      </ComponentContainer>
    </PageLayout>
  );
};

export default CostContainerPage;
