import React, { useReducer } from 'react';
import { Segment } from 'semantic-ui-react';
import styled from 'styled-components';
import QueryFilter from '../../../components/query_filter/QueryFilter';
import { CostContainerData } from './CostContainerData';
import FilterOutput from '../../../components/query_filter/FilterOuput';
import { updateFilterReducer, INITIAL_STATE } from '../../../reducers/updateFilterReducer';

const QueryContainer = styled.div`
  display: flex;
  margin-top: 1em;
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

  const [filterOutput, dispatch] = useReducer(updateFilterReducer, INITIAL_STATE);

  const updateSetIsQueryValid = (value: boolean) => {
    setIsQueryValid(value);
  };

  return (
    <>
      <QueryContainer>
        <StyledSegment>
          <QueryFilter updateSetIsQueryValid={updateSetIsQueryValid} dispatch={dispatch} />
        </StyledSegment>
        <StyledSegment className="result-container">
          <CostContainerData isQueryValid={isQueryValid} />
        </StyledSegment>
      </QueryContainer>
      <FilterOutput value={filterOutput} />
    </>
  );
};

export default CostContainerBuilder;
