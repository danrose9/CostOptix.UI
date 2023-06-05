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

const QueryFilter: React.FC<IQueryFilterProps> = (props) => {
  const [filterGroup, setFilterGroup] = useState<any>([]);

  const onAddBtnClick = (event: any) => {
    setFilterGroup(filterGroup.concat(<FilterGroup key={filterGroup.length} />));
  };

  return (
    <PageLayout title="Query Filter">
      <div style={{ height: '20px' }} />
      <Button onClick={onAddBtnClick}>Add input</Button>
      <div style={{ height: '20px' }} />
      {filterGroup}
    </PageLayout>
  );
};

const StyledInput = styled(Input)`
  border: 1px;
`;

const StyledFilterGroup = styled.div`
  display: flex;
`;

const StyledActionGroup = styled(Button.Group)`
  padding: 5px;
`;

const FilterGroup: React.FC<any> = () => {
  const [value, setValue] = React.useState();

  const handleChange = (e: any, { value }: any) => setValue(value);
  return (
    <Grid columns={1}>
      <StyledFilterGroup>
        <Dropdown onChange={handleChange} options={fields} placeholder="Select field" selection value={value} search />
        <Dropdown options={stringOperators} placeholder="Select operator" selection search />
        <StyledInput placeholder="Enter filter value" />
        <StyledActionGroup size="mini">
          <Button icon="add" />
          <Button icon="close" />
        </StyledActionGroup>
      </StyledFilterGroup>
      <Grid.Column>
        <Segment secondary>
          <pre>Query: {value}</pre>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default QueryFilter;
