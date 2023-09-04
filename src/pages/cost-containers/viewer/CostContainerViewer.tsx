import React, { useState } from 'react';
import { Radio, Segment } from 'semantic-ui-react';
import { ICostContainer } from '../../../types/container-types';
import { ComponentContainer, StyledSegment } from '../../__styles__/CostContainerCommonStyles';
import { CostContainerChart, CostContainerSummary, CostContainerResourceList } from '../index';

interface ICostContainerViewerProps {
  selectedContainer: ICostContainer;
  toggleContainerDetail: (value: boolean) => void;
}

export const CostContainerViewer: React.FC<ICostContainerViewerProps> = ({
  selectedContainer,
  toggleContainerDetail,
}) => {
  const { monthlySpend, ...containerSummaryData } = selectedContainer;
  const [showResources, setShowResources] = useState(false);

  const handleClose = (e: any) => {
    e.preventDefault();
    toggleContainerDetail(false);
  };

  return (
    <>
      <ComponentContainer>
        <StyledSegment>
          <CostContainerChart data={monthlySpend} />
        </StyledSegment>
        <StyledSegment className="fill-available">
          <CostContainerSummary handleClose={handleClose} data={containerSummaryData} />
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
