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
`;

const StyledActionGroup = styled(Button.Group)`
  padding: 5px;
`;

const StyledDropdown = styled(Dropdown)`
  z-index: 1;

  &:after {
    z-index: 1000;
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
      <StyledFilterGroup>
        <StyledDropdown
          onChange={handleChange}
          options={fields}
          placeholder="Select field"
          selection
          value={value}
          search
          style={{ margin: '0 5px' }}
        />
        <StyledDropdown
          options={stringOperators}
          placeholder="Select operator"
          selection
          search
          style={{ margin: '0 5px' }}
        />
        <StyledInput placeholder="Enter filter value" style={{ margin: '0 5px' }} />
        <StyledActionGroup size="mini">
          <Button icon="add" onClick={onAddBtnClick} />

          <Button icon="close" onClick={() => onRemoveBtnClick(index)} />
        </StyledActionGroup>
      </StyledFilterGroup>
    </Grid>
  );
};

const QueryFilter: React.FC<IQueryFilterProps> = (props) => {
  const [filterGroup, setFilterGroup] = useState<any>([]);
  const [filterOutput, setFilterOutput] = useState<any>([]);

  const onAddBtnClick = (event: any) => {
    const newFilterGroup = <FilterGroup key={filterGroup.length} onRemoveBtnClick={onRemoveBtnClick} />;
    setFilterGroup([...filterGroup, newFilterGroup]);
  };

  const onRemoveBtnClick = (index: number) => {
    const updatedFilterGroup = filterGroup.filter((_: any, i: number) => i !== index);
    setFilterGroup(updatedFilterGroup);
  };

  return (
    <PageLayout title="Query Filter">
      <div style={{ padding: '20px 0 ' }}>
        <Button onClick={onAddBtnClick}>Add input</Button>
      </div>
      {filterGroup.map((filter: any, index: any) => (
        <FilterGroup key={index} index={index} onRemoveBtnClick={onRemoveBtnClick} onAddBtnClick={onAddBtnClick} />
      ))}

      <FilterOutput value={filterOutput} />
    </PageLayout>
  );
};
export default QueryFilter;
