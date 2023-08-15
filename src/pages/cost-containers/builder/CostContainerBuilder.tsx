import React, { useReducer, useState } from 'react';
import { Segment } from 'semantic-ui-react';
import styled from 'styled-components';
import QueryFilter from '../../../components/query_filter/QueryFilter';
import { CostContainerData } from './CostContainerData';
import FilterOutput from '../../../components/query_filter/FilterOuput';
import { updateFilterReducer, INITIAL_STATE } from '../../../reducers/updateFilterReducer';
import { IAddCostContainerArgs } from '../../../services/redux/thunks/costContainerThunk';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../services/redux/store';
import { addCostContainer } from '../../../services/redux/thunks/costContainerThunk';

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

export interface ICostContainerBuilderProps {
  showFilterOutput?: boolean;
  toggleContainerList: (value: boolean) => void;
}

export const CostContainerBuilder: React.FC<ICostContainerBuilderProps> = ({
  showFilterOutput,
  toggleContainerList,
}) => {
  const thunk = useDispatch();

  const [isQueryValid, setIsQueryValid] = useState<boolean>(false);
  const [filterOutput, dispatch] = useReducer(updateFilterReducer, INITIAL_STATE);

  const updateSetIsQueryValid = (value: boolean) => {
    setIsQueryValid(value);
  };

  const handleAddContainer = (container: IAddCostContainerArgs) => {
    // Append filterOutput with container
    const query = filterOutput;
    const args = { ...container, query };

    /* Check that the dispatch was successful before navigating */
    thunk<AppDispatch>(addCostContainer(args));

    toggleContainerList(false);
  };

  return (
    <>
      <QueryContainer>
        <StyledSegment>
          <QueryFilter updateSetIsQueryValid={updateSetIsQueryValid} dispatch={dispatch} />
        </StyledSegment>
        <StyledSegment className="result-container">
          <CostContainerData isQueryValid={isQueryValid} handleAddContainer={handleAddContainer} />
        </StyledSegment>
      </QueryContainer>
      {showFilterOutput ? <FilterOutput value={filterOutput} /> : null}
    </>
  );
};

export default CostContainerBuilder;
