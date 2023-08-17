import React, { useReducer, useState } from 'react';
import { Segment } from 'semantic-ui-react';
import styled from 'styled-components';
import QueryFilter from '../../../components/query_filter/QueryFilter';
import { CostContainerData } from './CostContainerData';
import FilterOutput from '../../../components/query_filter/FilterOuput';
import { updateFilterReducer, INITIAL_STATE } from '../../../reducers/updateFilterReducer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../services/redux/store';
import { addCostContainer } from '../../../services/redux/thunks/costContainerThunk';
import { INewCostContainer } from '../../../types/container-types';

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
  container?: INewCostContainer;
}

export const CostContainerBuilder: React.FC<ICostContainerBuilderProps> = ({
  showFilterOutput,
  toggleContainerList,
  container,
}) => {
  const thunk = useDispatch();

  const [isQueryValid, setIsQueryValid] = useState<boolean>(false);
  const [filterOutput, dispatch] = useReducer(updateFilterReducer, INITIAL_STATE);

  const updateSetIsQueryValid = (value: boolean) => {
    setIsQueryValid(value);
  };

  const handleAddContainer = (container: INewCostContainer) => {
    // Append filterOutput with container
    const query = filterOutput;
    const args = { ...container, query };

    /* Check that the dispatch was successful before navigating */
    thunk<AppDispatch>(addCostContainer(args)).then((response: any) => {
      console.log('response', response);
      if (!response.error) {
        toggleContainerList(false);
      }
    });
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
