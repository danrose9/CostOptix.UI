import React, { useReducer, useState } from 'react';
import { Segment, Radio } from 'semantic-ui-react';
import styled from 'styled-components';
import QueryFilter from '../../../components/query_filter/QueryFilter';
import { CostContainerData } from './CostContainerData';
import FilterOutput from '../../../components/query_filter/FilterOuput';
import { updateFilterReducer } from '../../../reducers/updateFilterReducer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../services/redux/store';
import { addCostContainer, updateCostContainer } from '../../../services/redux/thunks/costContainerThunk';
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

  const [filterOutput, dispatch] = useReducer(updateFilterReducer, containerProps?.query);

  const updateSetIsQueryValid = (value: boolean) => {
    setIsQueryValid(value);
  };

  const handleSaveContainer = (container: INewCostContainer) => {
    // Append filterOutput with container
    const query = filterOutput;
    const args = { ...container, query };

    if (!container.id) {
      thunk<AppDispatch>(addCostContainer(args)).then((response: any) => {
        console.log('response', response);
      });
    } else {
      const argsWithId = { ...args, id: container.id };
      thunk<AppDispatch>(updateCostContainer(argsWithId)).then((response: any) => {
        console.log('response', response);
      });
    }
  };

  return (
    <>
      <QueryContainer>
        <StyledSegment>
          <QueryFilter
            updateSetIsQueryValid={updateSetIsQueryValid}
            dispatch={dispatch}
            activeQuery={activeContainer?.query}
          />
        </StyledSegment>
        <StyledSegment className="result-container">
          <CostContainerData
            isQueryValid={isQueryValid}
            handleSaveContainer={handleSaveContainer}
            toggleContainerList={toggleContainerList}
            activeContainer={activeContainer}
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
