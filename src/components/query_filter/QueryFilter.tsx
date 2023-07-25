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
      /* Responsible for adding a new filter to the state, if index is > 0 then this will also prepend a conditional operator */
      /* Returns the indexed filter that is being modified */
      /* {"0":{"field":"BillingAccountId","operator":"gt","value":"bar"}} */

      let key = Object.keys(value);
      let index = parseInt(key[0]);

      if (index > 0) {
        const filterWithConditionalOperator = {
          [index]: { conditionalOperator: 'and', ...value[index] },
        };
        return [...state, filterWithConditionalOperator];
      }

      return [...state, value];
    case 'UPDATE_CONDITIONAL_OPERATOR':
      /* Responsible for changing the value of the conditional operator based on the index */
      /* TODO: This currently just adds a new empty filter and conditional operator to the state */
      /* TODO: When changing the conditional operator, it should update the existing filter */
      /* TODO: maxIndex is not working as expected */

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
      /* Responsible for updating the value of the filter based on the index */
      /* TODO: Replace entire object with value */
      /* TODO: Add conditional operator to filter */
      return value;
    case 'REMOVE_FILTER':
      /* Responsible for removing the filter based on the index */
      /* TODO: Remove conditional operator from filter based on index */
      return value;
    case 'RESET_QUERY':
      /* Responsible for resetting the entire query */
      /* TODO: Reset query to initial state */
      /* TODO: Reset components to original state */
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
