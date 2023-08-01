import React, { useState, useReducer, useEffect } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import FilterGroup from './FilterGroup';
import { StyledResult, StyledFilterOutput, StyledResetButton } from '../__styles__/StyledQueryFilter';
import { updateFilterReducer, INITIAL_STATE, INTIAL_FILTER } from '../../reducers/updateFilterReducer';

interface IFilterOutputProps {
  value: string;
}

const FilterOutput: React.FC<IFilterOutputProps> = (props) => {
  const { value } = props;
  const jsonString = JSON.stringify(value, null);
  return (
    <StyledFilterOutput columns={1}>
      <Grid.Column>
        <Segment secondary>
          <StyledResult>Query: {jsonString}</StyledResult>
        </Segment>
      </Grid.Column>
    </StyledFilterOutput>
  );
};

// Define error throwing functions
const throwError = (): void => {
  throw new Error('Function not implemented.');
};
const dispatchError = (value: any): void => {
  throw new Error('Function not implemented.');
};

interface IQueryFilterProps {}

const QueryFilter: React.FC<IQueryFilterProps> = () => {
  const filterGroupInitialState = [
    <FilterGroup
      key={0}
      index={0}
      count={0}
      onRemoveBtnClick={throwError}
      onAddBtnClick={throwError}
      dispatch={dispatchError}
    />,
  ];
  const [filterGroup, setFilterGroup] = useState<any>([filterGroupInitialState]);

  const [filterOutput, dispatch] = useReducer(updateFilterReducer, INITIAL_STATE);

  const onAddBtnClick = () => {
    const newFilterGroup = (
      <FilterGroup
        key={filterGroup.length}
        onRemoveBtnClick={onRemoveBtnClick}
        onAddBtnClick={throwError}
        dispatch={dispatchError}
        count={0}
        index={0}
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
        />
      ))}

      <FilterOutput value={filterOutput} />
      <StyledResetButton onClick={handleReset}>Reset</StyledResetButton>
    </>
  );
};
export default QueryFilter;
