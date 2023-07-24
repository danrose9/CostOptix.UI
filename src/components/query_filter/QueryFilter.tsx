import React, { useState, useReducer } from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import FilterGroup from './FilterGroup';
import { StyledResult, StyledFilterOutput, StyledResetButton } from '../__styles__/StyledQueryFilter';

interface IQueryFilterProps {}

const INITIAL_STATE = [] as any;

const updateFilterOutput = (state: any, action: any) => {
  const { value } = action.payload;
  switch (action.type) {
    case 'ADD_FILTER':
      /* Returns the indexed filter that is being modified */
      /* {"1":{"field":"BillingAccountId","operator":"gt","value":"bar"}} */

      /* TODO: Replace entire object with value */
      /* TODO: Add conditional operator to filter */
      const index = state.findIndex((filter: any) => filter.id === value.id);
      if (index >= 0) {
        return state.map((filter: any, i: number) => (i === index ? value : filter));
      } else {
        return [...state, value];
      }
    case 'ADD_CONDITIONAL_OPERATOR':
      // Fetch the current maximum index in state
      const maxIndex = Math.max(...state.map((item: any) => Number(Object.keys(item)[0])));

      // Add the new filter with conditionalOperator to state
      return [
        ...state,
        {
          [maxIndex + 1]: {
            conditionalOperator: value.conditionalOperator,
            field: '',
            operator: '',
            value: '',
          },
        },
      ];

    case 'UPDATE_FILTER':
      return value;
    case 'RESET_FILTER':
      return INITIAL_STATE;
    default:
      throw new Error();
  }
};

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

  const [filterOutput, dispatch] = useReducer(updateFilterOutput, INITIAL_STATE);

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
    dispatch({ type: 'RESET_FILTER', payload: { value: INITIAL_STATE } });
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
