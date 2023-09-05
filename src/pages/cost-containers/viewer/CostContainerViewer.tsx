import React, { useState } from 'react';
import { Radio, Segment } from 'semantic-ui-react';
import { ICostContainer, ContainerAction } from '../../../types/container-types';
import { ComponentContainer, StyledSegment } from '../../__styles__/CostContainerCommonStyles';
import { CostContainerChart, CostContainerSummary, CostContainerResourceList } from '../index';

interface ICostContainerViewerProps {
  selectedContainer: ICostContainer;
  handleContainerAction?: (id: string | null, action: ContainerAction) => void;
}

export const CostContainerViewer: React.FC<ICostContainerViewerProps> = ({
  selectedContainer,
  handleContainerAction,
}) => {
  const { monthlySpend, ...containerSummaryData } = selectedContainer;
  const [showResources, setShowResources] = useState(false);

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
        <Radio
          toggle
          label={showResources ? 'Hide Resources' : 'Show Resources'}
          onChange={() => {
            setShowResources(!showResources);
          }}
        />
      </Segment>
      {showResources ? <CostContainerResourceList /> : null}
    </>
  );
};

export default CostContainerViewer;
