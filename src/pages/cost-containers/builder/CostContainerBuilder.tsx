import React, { useEffect, useReducer, useState } from 'react';
import { Segment, Radio } from 'semantic-ui-react';
import styled from 'styled-components';
import QueryFilter from '../../../components/query_filter/QueryFilter';
import { CostContainerData } from './CostContainerData';
import FilterOutput from '../../../components/query_filter/FilterOuput';
import { updateFilterReducer, INITIAL_STATE } from '../../../reducers/updateFilterReducer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../services/redux/store';
import { addCostContainer } from '../../../services/redux/thunks/costContainerThunk';
import { ICostContainer, INewCostContainer } from '../../../types/container-types';

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
  toggleContainerList: (value: boolean) => void;
  containerProps: INewCostContainer | null;
}

/*
 * This component is used to build a new cost container.
 * containerProps can be passed in to pre-populate the form or be empty to create a new container.
 */

export const CostContainerBuilder: React.FC<ICostContainerBuilderProps> = ({ toggleContainerList, containerProps }) => {
  const thunk = useDispatch();

  const [activeContainer, setActiveContainer] = useState<INewCostContainer | null>(containerProps);

  const [showFilterOutput, setShowFilterOutput] = useState(false);
  const [isQueryValid, setIsQueryValid] = useState<boolean>(false);

  // INITIAL_STATE should be changed to what the incoming query is
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
      if (!response.error) {
        toggleContainerList(false);
      }
    });
  };

  useEffect(() => {
    console.log('activeContainer', activeContainer);
    console.log('filterOutput', filterOutput);
  }, [activeContainer, filterOutput]);

  return (
    <>
      <QueryContainer>
        <StyledSegment>
          <QueryFilter updateSetIsQueryValid={updateSetIsQueryValid} dispatch={dispatch} />
        </StyledSegment>
        <StyledSegment className="result-container">
          <CostContainerData
            isQueryValid={isQueryValid}
            handleAddContainer={handleAddContainer}
            toggleContainerList={toggleContainerList}
          />
        </StyledSegment>
      </QueryContainer>
      <Segment basic style={{ padding: '0 1rem' }}>
        <Radio
          toggle
          label={showFilterOutput ? 'Hide Filter' : 'Show Filter'}
          onChange={() => {
            setShowFilterOutput(!showFilterOutput);
          }}
        />
      </Segment>
      {showFilterOutput ? <FilterOutput value={filterOutput} /> : null}
    </>
  );
};

export default CostContainerBuilder;
