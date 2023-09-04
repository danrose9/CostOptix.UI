import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../services/redux/rootReducer';
import { Spinner } from '../../components/Loader';
import { reduxState } from '../../services/redux/reduxState';
import PageLayout from '../PageLayout';
import styled from 'styled-components';
import { CostContainerTable } from './index';
import { fetchCostContainers } from '../../services/redux/thunks/costContainerThunk';
import { AppDispatch } from '../../services/redux/store';
import { PageContainer, FullWidthContainer } from '../__styles__/CostContainerCommonStyles';

interface ICostContainerPage {}

const CostContainerPage: React.FC<ICostContainerPage> = (props) => {
  const dispatch = useDispatch();
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const allCostContainers = useSelector((state: IRootState) => state[reduxState.COST_CONTAINERS]);

  const expandContainer = (component: string) => {
    setSelectedComponent(component);
  };

  useEffect(() => {
    dispatch<AppDispatch>(fetchCostContainers());
  }, [dispatch]);

  return (
    <PageLayout title="Cost Containers">
      <PageContainer>
        {allCostContainers.isLoading ? (
          <Spinner />
        ) : (
          <FullWidthContainer>
            <CostContainerTable allCostContainers={allCostContainers} />
          </FullWidthContainer>
        )}
      </PageContainer>
    </PageLayout>
  );
};

export default CostContainerPage;
