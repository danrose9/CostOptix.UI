import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../services/redux/rootReducer';
import { reduxState } from '../../services/redux/reduxState';
import PageLayout from '../PageLayout';
import styled from 'styled-components';
import CostContainerTable from './CostContainerTable';
import CostContainerDetail from './CostContainerDetail';
import { fetchCostContainers } from '../../services/redux/thunks/costContainerThunk';
import { AppDispatch } from '../../services/redux/store';

interface ContainerProps {
  selected?: boolean;
  expandContainer: () => void;
}

const ComponentContainer = styled.div`
  display: flex;
  padding: 0.5em 0 1em;
`;

const CostContainersList = styled.div`
  width: 100%;
`;

const ContainerDetail = styled.div`
  //   flex-basis: 30%;
`;

interface ICostContainerPage {}

const CostContainerPage: React.FC<ICostContainerPage> = (props) => {
  const dispatch = useDispatch();
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const containers = useSelector((state: IRootState) => state[reduxState.COST_CONTAINERS].containers);

  // const selectContainerDetail = (container: any) => {
  //   setSelectedCostContainer(container);
  // };

  const expandContainer = (component: string) => {
    setSelectedComponent(component);
  };

  useEffect(() => {
    dispatch<AppDispatch>(fetchCostContainers());
  }, [dispatch]);

  return (
    <PageLayout title="Cost Containers">
      <ComponentContainer>
        <CostContainersList>
          <CostContainerTable containers={containers} />
        </CostContainersList>
        {/* <ContainerDetail>
          <CostContainerDetail container={selectedCostContainer} expandContainer={expandContainer} />
        </ContainerDetail> */}
      </ComponentContainer>
    </PageLayout>
  );
};

export default CostContainerPage;
