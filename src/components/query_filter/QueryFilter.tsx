import React, { useState, useReducer } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import FilterGroup from './FilterGroup';
import { StyledResult, StyledFilterOutput } from '../__styles__/StyledQueryFilter';

interface IQueryFilterProps {}

const initialState = '{}';

const updateFilterOutput = (state: any, action: any) => {
  const { value } = action.payload;

  switch (action.type) {
    case 'APPEND_FILTER':
      // Assume value is a JSON string
      return JSON.stringify({
        ...JSON.parse(state),
        ...JSON.parse(value),
      });
    case 'UPDATE_FILTER':
      return value;
    case 'RESET_FILTER':
      return initialState;
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
  const [filterGroup, setFilterGroup] = useState<any>([<FilterGroup key={0} index={0} />]);
  const [filterOutput, dispatch] = useReducer(updateFilterOutput, initialState);

  const onAddBtnClick = () => {
    const newFilterGroup = <FilterGroup key={filterGroup.length} onRemoveBtnClick={onRemoveBtnClick} />;
    const updatedFilterGroup = [...filterGroup, newFilterGroup];

    // Add the class to the first instance of FilterGroup
    // updatedFilterGroup[0] = React.cloneElement(updatedFilterGroup[0], {
    //   className: 'show-horizontal-connector',
    // });

    setFilterGroup(updatedFilterGroup);
  };

  const onRemoveBtnClick = (index: number) => {
    const updatedFilterGroup = filterGroup.filter((_: any, i: number) => i !== index);
    console.log(`Filter group ${index} removed`);
    setFilterGroup(updatedFilterGroup);
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
    </>
  );
};
export default QueryFilter;
