import React, { Fragment } from 'react';
import { Button, Modal, Table, Icon, Container, Segment } from 'semantic-ui-react';
import styled from 'styled-components';
import QueryFilter from '../../../components/query_filter/QueryFilter';
import { CostContainerData } from './CostContainerData';

const AddNewContainerRow = styled(Table.Row)`
  cursor: pointer;
  color: #a9a9a9;
`;

const QueryContainer = styled.div`
  display: flex;
`;

const StyledSegment = styled(Segment)`
  margin: 0 !important;

  &.result-container {
    width: -webkit-fill-available;
    // max-height: 100vh;
    // overflow-y: auto;
  }
`;

export interface ICostContainerBuilderProps {}

export function CostContainerBuilder(props: ICostContainerBuilderProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <QueryContainer>
      <StyledSegment>
        <QueryFilter />
      </StyledSegment>
      <StyledSegment className="result-container">
        <CostContainerData />
      </StyledSegment>
    </QueryContainer>
  );
}

export default CostContainerBuilder;
