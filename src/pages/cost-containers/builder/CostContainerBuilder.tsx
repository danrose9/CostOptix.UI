import React, { useReducer, useState } from 'react';
import { Segment, Radio } from 'semantic-ui-react';
import { QueryFilter, FilterOutput } from '../../../components/query_filter/index';
import { CostContainerProfile } from './CostContainerProfile';
import { updateFilterReducer } from '../../../reducers/updateFilterReducer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../services/redux/store';
import { addCostContainer, updateCostContainer } from '../../../services/redux/thunks/costContainerThunk';
import { INewCostContainer, ContainerAction } from '../../../types/container-types';
import { ComponentContainer, StyledSegment } from '../../__styles__/CostContainerCommonStyles';

export interface ICostContainerBuilderProps {
  selectedContainer: INewCostContainer | null;
  handleContainerAction?: (id: string | null, action: ContainerAction) => void;
}

export const CostContainerBuilder: React.FC<ICostContainerBuilderProps> = ({
  selectedContainer,
  handleContainerAction,
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
            activeContainer={activeContainer}
            handleContainerAction={handleContainerAction}
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
