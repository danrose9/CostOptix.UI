import React, { useEffect, useState } from 'react';
import { Radio } from 'semantic-ui-react';
import { ICostContainer, ContainerAction } from '../../../../types/container-types';
import { ComponentContainer, StyledSegment, PaddedSegment } from '../../../__styles__/CostContainerCommonStyles';
import { CostContainerChart, CostContainerSummary, CostContainerResourceList } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../services/redux/store';
import { fetchCostContainersResources } from '../../../../services/redux/thunks/costContainerThunk';
import { RESET_RESOURCES } from '../../../../services/redux/reducers/costContainerSlice';
import { IRootState } from '../../../../services/redux/rootReducer';
import { reduxState } from '../../../../services/redux/reduxState';

interface ICostContainerViewerProps {
  selectedContainer: ICostContainer;
  handleContainerAction?: (id: string | null, action: ContainerAction) => void;
}

export const CostContainerViewer: React.FC<ICostContainerViewerProps> = ({
  selectedContainer,
  handleContainerAction,
}) => {
  const { monthlySpend, ...containerSummaryData } = selectedContainer;
  const { id } = selectedContainer;
  const [showResources, setShowResources] = useState(false);
  const [skip, setSkip] = useState(0);

  const dispatch = useDispatch();

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>, data: any) => {
    setSkip((data.activePage - 1) * 10);
  };

  const handleShowResources = (e: React.FormEvent<HTMLInputElement>, data: any) => {
    setShowResources((prevShowResources) => !prevShowResources);
  };

  useEffect(() => {
    if (id === null) return;
    dispatch<AppDispatch>(fetchCostContainersResources({ id, top: 10, skip: skip }));
  }, [dispatch, id, skip]);

  useEffect(() => {
    dispatch<AppDispatch>(RESET_RESOURCES());
  }, [dispatch]);

  const resources = useSelector((state: IRootState) => state[reduxState.COST_CONTAINERS].resources);

  return (
    <>
      <ComponentContainer>
        <StyledSegment>
          <CostContainerChart data={monthlySpend} />
        </StyledSegment>
        <StyledSegment className="fill-available">
          <CostContainerSummary data={containerSummaryData} handleContainerAction={handleContainerAction} />
        </StyledSegment>
      </ComponentContainer>
      <PaddedSegment basic>
        <Radio toggle label={showResources ? 'Hide Resources' : 'Show Resources'} onChange={handleShowResources} />
      </PaddedSegment>

      {showResources ? (
        <CostContainerResourceList
          resources={resources.data}
          count={resources.count}
          handlePageChange={handlePageChange}
        />
      ) : null}
    </>
  );
};

export default CostContainerViewer;
