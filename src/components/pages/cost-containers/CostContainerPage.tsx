import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../services/redux/rootReducer';
import { Loader } from '../../Loader';
import { reduxState } from '../../../services/redux/reduxState';
import PageWrapper from '../PageWrapper';
// replace this with default table
import { CostContainerTable } from './index';
import { fetchCostContainers } from '../../../services/redux/thunks/costContainerThunk';
import { AppDispatch } from '../../../services/redux/store';

interface ICostContainerPage {}

const CostContainerPage: React.FC<ICostContainerPage> = (props) => {
  const dispatch = useDispatch();
  const allCostContainers = useSelector((state: IRootState) => state[reduxState.COST_CONTAINERS]);

  useEffect(() => {
    dispatch<AppDispatch>(fetchCostContainers());
  }, [dispatch]);

  return (
    <PageWrapper title="Cost Containers">
      {allCostContainers.isLoading ? <Loader /> : <CostContainerTable allCostContainers={allCostContainers} />}
    </PageWrapper>
  );
};

export default CostContainerPage;
