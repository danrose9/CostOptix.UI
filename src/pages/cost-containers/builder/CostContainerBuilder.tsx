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
  padding: 1em;

  &.result-container {
    width: -webkit-fill-available;
  }
`;

export interface ICostContainerBuilderProps {}

export const CostContainerBuilder: React.FC<ICostContainerBuilderProps> = () => {
  const [isQueryValid, setIsQueryValid] = React.useState<boolean>(false);

  const updateSetIsQueryValid = (value: boolean) => {
    setIsQueryValid(value);
  };

  return (
    <QueryContainer>
      <StyledSegment>
        <QueryFilter updateSetIsQueryValid={updateSetIsQueryValid} />
      </StyledSegment>
      <StyledSegment className="result-container">
        <CostContainerData isQueryValid={isQueryValid} />
      </StyledSegment>
    </QueryContainer>
  );
};

export default CostContainerBuilder;
