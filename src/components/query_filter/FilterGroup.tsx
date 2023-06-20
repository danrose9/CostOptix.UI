import * as React from 'react';
import { Dropdown, Grid, Segment, Input, Button } from 'semantic-ui-react';
import PageLayout from '../../pages/PageLayout';
import styled from 'styled-components';
import { fields, stringOperators } from './operators';

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

const StyledInput = styled(Input)`
  border: 1px;
`;

const StyledFieldContainer = styled.div`
  padding: 0 1em 0 0;
`;

const FilterGroup: React.FC<any> = ({ index, onRemoveBtnClick, onAddBtnClick, dispatch }) => {
  const [value, setValue] = React.useState();

  const handleChange = (e: any, { value }: any) => {
    setValue(value);
    dispatch({ type: 'UPDATE_FILTER', payload: { value } });
  };
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

export default FilterGroup;
