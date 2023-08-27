import React, { useEffect, useState } from 'react';
import FilterGroup from './FilterGroup';
import { StyledResetButton } from '../__styles__/StyledQueryFilter';
import { INITIAL_FILTER } from '../../reducers/updateFilterReducer';

// Define error throwing functions
const throwError = (): void => {
  throw new Error('Function not implemented.');
};
const dispatchError = (value: any): void => {
  throw new Error('Function not implemented.');
};

export interface IQueryFilterProps {
  updateSetIsQueryValid: (value: boolean) => void;
  dispatch: React.Dispatch<any>;
  activeQuery: any;
}

const QueryFilter: React.FC<IQueryFilterProps> = ({ updateSetIsQueryValid, dispatch, activeQuery }) => {
  /* activeQuery is the current filter passed from parent */

  const [containerIndex, setContainerIndex] = useState<number>(0);
  const [resetKey, setResetKey] = useState(0);

  const onRemoveBtnClick = () => {
    setContainerIndex(containerIndex - 1);
    const updatedFilterGroup = filterGroup.filter((_: any, i: number) => i !== containerIndex);
    setFilterGroup(updatedFilterGroup);

    /* Update filter output */
    dispatch({
      type: 'REMOVE_FILTER',
      payload: { value: updatedFilterGroup.length },
    });
  };

  const newFilterGroup = (count: number, containerIndex: number, initialData: any = null) => {
    return (
      <FilterGroup
        count={count}
        key={containerIndex}
        containerIndex={containerIndex}
        onRemoveBtnClick={onRemoveBtnClick}
        onAddBtnClick={throwError}
        dispatch={dispatchError}
        updateSetIsQueryValid={updateSetIsQueryValid}
        initialData={initialData}
        filter={throwError}
        reset={resetKey}
      />
    );
  };

  // Init filter groups based on activeQuery
  const initialFilterGroups = activeQuery.map((query: any, index: number) => newFilterGroup(index, index, query));
  const [filterGroup, setFilterGroup] = useState<any>(
    initialFilterGroups.length ? initialFilterGroups : [newFilterGroup(0, 0)]
  );

  const onAddBtnClick = () => {
    setContainerIndex(containerIndex + 1);
    newFilterGroup(filterGroup.length, containerIndex, null);
    const updatedFilterGroup = [...filterGroup, newFilterGroup];

    setFilterGroup(updatedFilterGroup);
  };

  const handleQueryReset = () => {
    dispatch({ type: 'RESET_QUERY', payload: { value: INITIAL_FILTER } });
    // Reset filterGroup to a single group with no values
    setFilterGroup([newFilterGroup(0, 0)]);
    setResetKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      {filterGroup.map((filter: any, containerIndex: number) => (
        <FilterGroup
          count={filterGroup.length}
          key={containerIndex}
          containerIndex={containerIndex}
          onRemoveBtnClick={onRemoveBtnClick}
          onAddBtnClick={onAddBtnClick}
          dispatch={dispatch}
          updateSetIsQueryValid={updateSetIsQueryValid}
          initialData={activeQuery[containerIndex]}
          filter={filter}
          reset={resetKey}
        />
      ))}

      <StyledResetButton onClick={handleQueryReset} data-testid="cost-container-reset-button">
        Reset
      </StyledResetButton>
    </>
  );
};
export default QueryFilter;
