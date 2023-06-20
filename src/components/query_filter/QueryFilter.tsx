import React, { useState, useReducer } from 'react';
import { Dropdown, Grid, Segment, Input, Button } from 'semantic-ui-react';
import PageLayout from '../../pages/PageLayout';
import styled from 'styled-components';
import FilterGroup from './FilterGroup';
import { conditionalOperators } from './operators';

interface IQueryFilterProps {}

const StyledResult = styled.div`
  display: block;
  font-family: monospace;
  white-space: pre;
  margin: 1em 0;
`;
const StyledInput = styled(Input)`
  border: 1px;
`;

const StyledFilterGroup = styled.div`
  padding: 1em;
  display: flex;

  &.show-horizontal-connector .dropdown:before {
    content: '';
    position: absolute;
    left: -18px;
    top: 50%;
    height: 1px;
    width: 18px;
    background-color: #ccc;
  }
`;

const StyledActionGroup = styled.div`
  padding: 5px;
  display: flex;
`;

const StyledDropdown = styled(Dropdown)`
  z-index: 1;

  &:after {
    z-index: 1000;
  }
`;

const StyledFieldContainer = styled.div`
  padding: 0 1em 0 0;
`;

const ComponentContainer = styled.div`
  display: flex;
  padding: 0.5em 0 1em;
`;

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
