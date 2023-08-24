import React, { useState } from 'react';
import FilterGroup from './FilterGroup';
import { StyledResetButton } from '../__styles__/StyledQueryFilter';
import { INTIAL_FILTER } from '../../reducers/updateFilterReducer';

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
  /* activeQuery is the current state of the filter */

  const filterGroupInitialState = [
    <FilterGroup
      key={0}
      index={0}
      count={0}
      onRemoveBtnClick={throwError}
      onAddBtnClick={throwError}
      dispatch={dispatchError}
      updateSetIsQueryValid={updateSetIsQueryValid}
    />,
  ];
  const [filterGroup, setFilterGroup] = useState<any>([filterGroupInitialState]);

  const onAddBtnClick = () => {
    const newFilterGroup = (
      <FilterGroup
        key={filterGroup.length}
        onRemoveBtnClick={onRemoveBtnClick}
        onAddBtnClick={throwError}
        dispatch={dispatchError}
        count={0}
        index={0}
        updateSetIsQueryValid={updateSetIsQueryValid}
      />
    );
    const updatedFilterGroup = [...filterGroup, newFilterGroup];

    setFilterGroup(updatedFilterGroup);
  };

  const onRemoveBtnClick = (index: number) => {
    const updatedFilterGroup = filterGroup.filter((_: any, i: number) => i !== index);
    setFilterGroup(updatedFilterGroup);

    /* Update filter output */
    dispatch({
      type: 'REMOVE_FILTER',
      payload: { value: updatedFilterGroup.length },
    });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_QUERY', payload: { value: INTIAL_FILTER } });
    setFilterGroup(filterGroupInitialState);
  };

  return (
    <>
      {filterGroup.map((filter: any, index: number) => (
        <FilterGroup
          count={filterGroup.length}
          key={index}
          index={index}
          onRemoveBtnClick={onRemoveBtnClick}
          onAddBtnClick={onAddBtnClick}
          dispatch={dispatch}
          updateSetIsQueryValid={updateSetIsQueryValid}
        />
      ))}

      <StyledResetButton onClick={handleReset} data-testid="cost-container-reset-button">
        Reset
      </StyledResetButton>
    </>
  );
};
export default QueryFilter;
