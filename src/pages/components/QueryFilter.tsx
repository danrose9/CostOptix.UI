import React, { useState } from 'react';
import { Dropdown, Grid, Segment, Input, Button } from 'semantic-ui-react';
import PageLayout from '../PageLayout';
import styled from 'styled-components';

interface IQueryFilterProps {}

const fields = [
  { key: 1, text: 'Organization', value: 1 },
  { key: 2, text: 'Billing Account', value: 2 },
  { key: 3, text: 'Provider', value: 3 },
  { key: 4, text: 'Resource Id', value: 4 },
];

const stringOperators = [
  { key: 1, text: 'is equal to', value: 1 },
  { key: 2, text: 'is not equal to', value: 2 },
  { key: 3, text: 'contains', value: 3 },
  { key: 4, text: 'does not contain', value: 4 },
  { key: 5, text: 'begins with', value: 5 },
  { key: 6, text: 'ends with', value: 6 },
];

const integerOperators = [
  { key: 1, text: 'is equal to', value: 1 },
  { key: 2, text: 'is not equal to', value: 2 },
  { key: 3, text: 'is greater than', value: 3 },
  { key: 4, text: 'is greater than or equal to', value: 4 },
  { key: 5, text: 'is less than', value: 5 },
  { key: 6, text: 'is less than or equal to', value: 6 },
];

const dateOperators = [
  { key: 1, text: 'is equal to', value: 1 },
  { key: 2, text: 'is not equal to', value: 2 },
  { key: 3, text: 'is after', value: 3 },
  { key: 4, text: 'is after or equal to', value: 4 },
  { key: 5, text: 'is before', value: 5 },
  { key: 6, text: 'is before or equal to', value: 6 },
];

const conditionalOperators = [
  { key: 1, text: 'and', value: 'and' },
  { key: 2, text: 'or', value: 'or' },
];

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

const StyledReporQueryFilter = styled.div`
  margin-left: 5px;
  position: relative;
  &.show-horizontal-connector:before,
  &.show-horizontal-connector:after {
    content: '';
    position: absolute;
    left: -18px;
    width: 18px;
    border-color: #ccc;
    border-style: solid;
    box-sizing: border-box;
  }
  &.show-horizontal-connector:before {
    top: 14px;
    height: 1px;
    border-width: 0 0 2px 2px;
  }
  &.show-vertical-connector:after {
    top: 14px;
    height: calc(50% + 12px);
    border-width: 0 0 0 2px;
  }
  &.two-rows:before,
  &.two-rows:after {
    top: 40px;
  }
`;

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

const FilterGroup: React.FC<any> = ({ index, onRemoveBtnClick, onAddBtnClick }) => {
  const [value, setValue] = React.useState();

  const handleChange = (e: any, { value }: any) => setValue(value);
  return (
    <Grid columns={1}>
      <StyledFilterGroup className="show-horizontal-connector">
        <StyledFieldContainer>
          <StyledDropdown
            onChange={handleChange}
            options={fields}
            placeholder="Select field"
            selection
            value={value}
            search
            style={{ margin: '0 5px' }}
          />
        </StyledFieldContainer>
        <StyledFieldContainer>
          <StyledDropdown
            options={stringOperators}
            placeholder="Select operator"
            selection
            search
            style={{ margin: '0 5px' }}
          />
        </StyledFieldContainer>
        <StyledFieldContainer>
          <StyledInput placeholder="Enter filter value" style={{ margin: '0 5px' }} />
        </StyledFieldContainer>
        <StyledActionGroup>
          <StyledFieldContainer>
            <Button icon="add" onClick={onAddBtnClick} size="mini" />

            <Button icon="close" onClick={() => onRemoveBtnClick(index)} size="mini" />
          </StyledFieldContainer>
        </StyledActionGroup>
        {index}
      </StyledFilterGroup>
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
  const [filterOutput, setFilterOutput] = useState<any>([]);

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
        <FilterGroup key={index} index={index} onRemoveBtnClick={onRemoveBtnClick} onAddBtnClick={onAddBtnClick} />
      ))}

      <FilterOutput value={filterOutput} />
    </PageLayout>
  );
};
export default QueryFilter;
