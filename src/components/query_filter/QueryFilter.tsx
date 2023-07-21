import React, { useState, useReducer } from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import FilterGroup from './FilterGroup';
import { StyledResult, StyledFilterOutput, StyledResetButton } from '../__styles__/StyledQueryFilter';

interface IQueryFilterProps {}

const filterInitialState = { field: '', operator: '', value: '' };
const queryInitialState = '[]';

const updateFilterOutput = (state: any, action: any) => {
  const { value } = action.payload;
  // console.log('state', JSON.parse(state));
  // console.log('value', JSON.parse(value));
  switch (action.type) {
    case 'APPEND_FILTER':
      return value;
    case 'ADD_CONDITIONAL_OPERATOR':
      console.log('ADD_CONDITIONAL_OPERATOR', JSON.parse(value));
      console.log('STATE', state);
      return JSON.stringify([...state, '{foo: "bar"}']);
    case 'UPDATE_FILTER':
      return value;
    case 'RESET_FILTER':
      return queryInitialState;
    default:
      throw new Error();
  }
};

const FilterOutput: React.FC<any> = (props) => {
  const { value } = props;
  return (
    <StyledFilterOutput columns={1}>
      <Grid.Column>
        <Segment secondary>
          <StyledResult>Query: {value}</StyledResult>
        </Segment>
      </Grid.Column>
    </StyledFilterOutput>
  );
};

const QueryFilter: React.FC<IQueryFilterProps> = (props) => {
  const filterGroupInitialState = [<FilterGroup key={0} index={0} />];
  const [filterGroup, setFilterGroup] = useState<any>(filterGroupInitialState);

  const [filterOutput, dispatch] = useReducer(updateFilterOutput, []);

  const onAddBtnClick = () => {
    const newFilterGroup = <FilterGroup key={filterGroup.length} onRemoveBtnClick={onRemoveBtnClick} />;
    const updatedFilterGroup = [...filterGroup, newFilterGroup];

    setFilterGroup(updatedFilterGroup);
  };

  const onRemoveBtnClick = (index: number) => {
    const updatedFilterGroup = filterGroup.filter((_: any, i: number) => i !== index);
    console.log(`Filter group ${index} removed`);
    setFilterGroup(updatedFilterGroup);
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FILTER', payload: { value: queryInitialState } });
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
