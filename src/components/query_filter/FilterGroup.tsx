import * as React from 'react';
import { Dropdown, Grid, Segment, Input, Button } from 'semantic-ui-react';
import PageLayout from '../../pages/PageLayout';
import styled from 'styled-components';
import { fields, stringOperators, conditionalOperators } from './operators';
import {
  StyledDropdown,
  StyledFilterGroup,
  StyledFieldContainer,
  StyledInput,
  StyledActionGroup,
} from '../__styles__/StyledQueryFilter';

const FilterOperator: React.FC<any> = () => {
  const [value, setValue] = React.useState();

  const handleChange = (e: any, { value }: any) => setValue(value);
  return (
    <Grid columns={1}>
      <StyledFilterGroup>
        <StyledFieldContainer className="show-vertical-connector">
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

const FilterGroup: React.FC<any> = ({ index, onRemoveBtnClick, onAddBtnClick, dispatch }) => {
  const [value, setValue] = React.useState();

  const handleChange = (e: any, { value }: any) => {
    setValue(value);
    dispatch({ type: 'UPDATE_FILTER', payload: { value } });
  };

  return (
    <React.Fragment>
      {index !== 0 ? <FilterOperator /> : null}

      <Grid columns={1} style={{ paddingLeft: '4em' }}>
        <StyledFilterGroup>
          <StyledFieldContainer className="show-horizontal-connector">
            <StyledDropdown
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
    </React.Fragment>
  );
};

export default FilterGroup;
