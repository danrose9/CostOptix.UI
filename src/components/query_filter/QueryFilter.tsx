import React, { useState, useReducer } from 'react';
import { Dropdown, Grid, Segment, Input, Button } from 'semantic-ui-react';
import PageLayout from '../../pages/PageLayout';
import styled from 'styled-components';
import FilterGroup from './FilterGroup';
import { conditionalOperators } from './operators';
import { StyledResult, StyledFilterGroup, StyledFieldContainer, StyledDropdown } from '../__styles__/StyledQueryFilter';

interface IQueryFilterProps {}

const initialState = '{}';

const updateFilterOutput = (state: any, action: any) => {
  const { value } = action.payload;

  switch (action.type) {
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
    <Grid columns={1}>
      <Grid.Column>
        <Segment secondary>
          <StyledResult>Query: {value}</StyledResult>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

const FilterOperator: React.FC<any> = () => {
  const [value, setValue] = React.useState();

  const handleChange = (e: any, { value }: any) => setValue(value);
  return (
    <Grid columns={1}>
      <StyledFilterGroup>
        <StyledFieldContainer>
          <StyledDropdown
            onChange={handleChange}
            options={conditionalOperators}
            selection
            compact
            defaultValue="and"
            value={value}
            style={{ margin: '0 5px' }}
          />
        </StyledFieldContainer>
      </StyledFilterGroup>
    </Grid>
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
    console.log(updatedFilterGroup);
    setFilterGroup(updatedFilterGroup);
  };

  return (
    <PageLayout title="Query Filter">
      {filterGroup.map((filter: any, index: any) => (
        <FilterGroup
          key={index}
          index={index}
          onRemoveBtnClick={onRemoveBtnClick}
          onAddBtnClick={onAddBtnClick}
          dispatch={dispatch}
        />
      ))}

      <FilterOutput value={filterOutput} />
    </PageLayout>
  );
};
export default QueryFilter;
