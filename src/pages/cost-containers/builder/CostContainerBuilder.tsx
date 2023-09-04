import React, { useReducer, useState } from 'react';
import { Segment, Radio } from 'semantic-ui-react';
import { QueryFilter, FilterOutput } from '../../../components/query_filter/index';
import { CostContainerProfile } from './CostContainerProfile';
import { updateFilterReducer } from '../../../reducers/updateFilterReducer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../services/redux/store';
import { addCostContainer, updateCostContainer } from '../../../services/redux/thunks/costContainerThunk';
import { INewCostContainer } from '../../../types/container-types';
import { ComponentContainer, StyledSegment } from '../../__styles__/CostContainerCommonStyles';

export interface ICostContainerBuilderProps {
  toggleContainerList: (value: boolean) => void;
  selectedContainer: INewCostContainer | null;
}

/*
 * This component is used to build a new cost container.
 * containerProps can be passed in to pre-populate the form or be empty to create a new container.
 */

export const CostContainerBuilder: React.FC<ICostContainerBuilderProps> = ({
  toggleContainerList,
  selectedContainer,
}) => {
  const thunk = useDispatch();

  const [activeContainer, setActiveContainer] = useState<INewCostContainer | null>(selectedContainer);

  const [showFilterOutput, setShowFilterOutput] = useState(false);
  const [isQueryValid, setIsQueryValid] = useState<boolean>(false);

  const [filterOutput, dispatch] = useReducer(updateFilterReducer, selectedContainer?.query);

  const updateSetIsQueryValid = (value: boolean) => {
    setIsQueryValid(value);
  };

  const handleSaveContainer = (container: INewCostContainer) => {
    // Append filterOutput with container
    const query = filterOutput;
    const args = { ...container, query };

    if (!container.id) {
      thunk<AppDispatch>(addCostContainer(args)).then((response: any) => {});
    } else {
      const argsWithId = { ...args, id: container.id };
      thunk<AppDispatch>(updateCostContainer(argsWithId)).then((response: any) => {});
    }
  };

  return (
    <>
      <ComponentContainer>
        <StyledSegment>
          <QueryFilter
            updateSetIsQueryValid={updateSetIsQueryValid}
            dispatch={dispatch}
            activeQuery={activeContainer?.query}
          />
        </StyledSegment>
        <StyledSegment className="fill-available">
          <CostContainerProfile
            isQueryValid={isQueryValid}
            handleSaveContainer={handleSaveContainer}
            toggleContainerList={toggleContainerList}
            activeContainer={activeContainer}
          />
        </StyledSegment>
      </ComponentContainer>
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
