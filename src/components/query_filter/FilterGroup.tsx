import * as React from 'react';
import { Dropdown, Grid, Segment, Input, Button } from 'semantic-ui-react';
import PageLayout from '../../pages/PageLayout';
import styled from 'styled-components';
import { fields, stringOperators } from './operators';
import {
  StyledDropdown,
  StyledFilterGroup,
  StyledFieldContainer,
  StyledInput,
  StyledActionGroup,
} from '../__styles__/StyledQueryFilter';

const FilterGroup: React.FC<any> = ({ index, onRemoveBtnClick, onAddBtnClick, dispatch }) => {
  const [value, setValue] = React.useState();

  const handleChange = (e: any, { value }: any) => {
    setValue(value);
    dispatch({ type: 'UPDATE_FILTER', payload: { value } });
  };

  return (
    <Grid columns={1}>
      <StyledFilterGroup>
        <StyledFieldContainer>
          <StyledDropdown
            className="show-horizontal-connector"
            onChange={handleChange}
            options={fields}
            placeholder="Select field"
            selection
            value={value}
            style={{ margin: '0 5px' }}
          />
        </StyledFieldContainer>
        <StyledFieldContainer>
          <StyledDropdown
            options={stringOperators}
            placeholder="Select operator"
            selection
            style={{ margin: '0 5px' }}
          />
        </StyledFieldContainer>
        <StyledFieldContainer>
          <StyledInput placeholder="Enter filter value" style={{ margin: '0 5px' }} />
        </StyledFieldContainer>
        <StyledActionGroup>
          <StyledFieldContainer>
            <Button icon="add" onClick={onAddBtnClick} size="mini" />
            {index !== 0 ? <Button icon="close" onClick={() => onRemoveBtnClick(index)} size="mini" /> : null}
          </StyledFieldContainer>
        </StyledActionGroup>
        {index}
      </StyledFilterGroup>
    </Grid>
  );
};

export default FilterGroup;
