import React, { useState, useReducer } from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import FilterGroup from './FilterGroup';
import { StyledResult, StyledFilterOutput, StyledResetButton } from '../__styles__/StyledQueryFilter';
import { updateFilterReducer, INITIAL_STATE, INTIAL_FILTER } from '../../reducers/updateFilterReducer';

interface IQueryFilterProps {}

const FilterOutput: React.FC<any> = (props) => {
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

const QueryFilter: React.FC<IQueryFilterProps> = (props) => {
  const filterGroupInitialState = [<FilterGroup key={0} index={0} />];
  const [filterGroup, setFilterGroup] = useState<any>([filterGroupInitialState]);

  const [filterOutput, dispatch] = useReducer(updateFilterReducer, INITIAL_STATE);

  const onAddBtnClick = () => {
    const newFilterGroup = <FilterGroup key={filterGroup.length} onRemoveBtnClick={onRemoveBtnClick} />;
    const updatedFilterGroup = [...filterGroup, newFilterGroup];

    setFilterGroup(updatedFilterGroup);
  };

  const onRemoveBtnClick = (index: number) => {
    const updatedFilterGroup = filterGroup.filter((_: any, i: number) => i !== index);
    console.log(`Filter group ${index} removed`);
    setFilterGroup(updatedFilterGroup);

    dispatch({
      type: 'REMOVE_FILTER',
      payload: { value: index },
    });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_QUERY', payload: { value: INTIAL_FILTER } });
    setFilterGroup(filterGroupInitialState);
  };

  return (
    <>
      {filterGroup.map((filter: any, index: any) => (
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
