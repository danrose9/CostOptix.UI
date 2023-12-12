import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../services/redux/rootReducer';
import { Spinner } from '../../Loader';
import { reduxState } from '../../../services/redux/reduxState';
import PageLayout from '../PageLayout';
import { CostContainerTable } from './index';
import { fetchCostContainers } from '../../../services/redux/thunks/costContainerThunk';
import { AppDispatch } from '../../../services/redux/store';
import { PageContainer } from '../../__styles__/CostContainerCommonStyles';

interface ICostContainerPage {}

const CostContainerPage: React.FC<ICostContainerPage> = (props) => {
  const dispatch = useDispatch();
  const allCostContainers = useSelector((state: IRootState) => state[reduxState.COST_CONTAINERS]);

  useEffect(() => {
    dispatch<AppDispatch>(fetchCostContainers());
  }, [dispatch]);

  return (
    <PageLayout title="Cost Containers">
      <PageContainer className="full-width">
        {allCostContainers.isLoading ? <Spinner /> : <CostContainerTable allCostContainers={allCostContainers} />}
      </PageContainer>
    </PageLayout>
  );
};

export default CostContainerPage;
