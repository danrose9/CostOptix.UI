import React, { useEffect, useState } from 'react';
import { Radio, Segment } from 'semantic-ui-react';
import { ICostContainer, ContainerAction } from '../../../types/container-types';
import { ComponentContainer, StyledSegment } from '../../__styles__/CostContainerCommonStyles';
import { CostContainerChart, CostContainerSummary, CostContainerResourceList } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../services/redux/store';
import { fetchCostContainersResources } from '../../../services/redux/thunks/costContainerThunk';
import { RESET_RESOURCES } from '../../../services/redux/reducers/costContainerSlice';
import { IResource } from '../../../types/resource-types';
import { IRootState } from '../../../services/redux/rootReducer';
import { reduxState } from '../../../services/redux/reduxState';
import { COST_CONTAINERS } from '../../../app/appRoutes';

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
  // const [resources, setResources] = useState<IResource[]>([]);

  const dispatch = useDispatch();

  const handleShowResources = (e: React.FormEvent<HTMLInputElement>, data: any) => {
    if (id === null) return;

    dispatch<AppDispatch>(fetchCostContainersResources({ id }));
    setShowResources((prevShowResources) => !prevShowResources);
    // .then((fetchedResources: React.SetStateAction<IResource[]>) => {
    //   setResources(fetchedResources);
    //   setShowResources((prevShowResources) => !prevShowResources);
    // })
    // .catch((error: any) => {
    //   console.error('Failed to fetch resources:', error);
    // });
  };

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
      <Segment basic style={{ padding: '0 1rem' }}>
        <Radio toggle label={showResources ? 'Hide Resources' : 'Show Resources'} onChange={handleShowResources} />
      </Segment>

      {showResources ? <CostContainerResourceList resources={resources} /> : null}
    </>
  );
};

export default CostContainerViewer;
