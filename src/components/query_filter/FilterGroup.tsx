import * as React from 'react';
import { Dropdown, Grid, Segment, Input, Button } from 'semantic-ui-react';
import PageLayout from '../../pages/PageLayout';
import styled from 'styled-components';
import { fields, operators, conditionalOperators } from './operators';
import {
  StyledDropdown,
  StyledFilterGroup,
  StyledFieldContainer,
  StyledInput,
  StyledActionGroup,
  StyledGrid,
} from '../__styles__/StyledQueryFilter';

const FilterOperator: React.FC<any> = () => {
  const [value, setValue] = React.useState();

  const handleChange = (e: any, { value }: any) => setValue(value);

  return (
    <StyledGrid columns={1} className="filter-operator">
      <StyledFilterGroup>
        <StyledFieldContainer className="show-vertical-connector">
          <StyledDropdown
            className="set-minimum-width"
            onChange={handleChange}
            options={conditionalOperators}
            selection
            compact
            defaultValue="and"
            value={value}
          />
        </StyledFieldContainer>
      </StyledFilterGroup>
    </StyledGrid>
  );
};

const FilterGroup: React.FC<any> = ({ count, index, onRemoveBtnClick, onAddBtnClick, dispatch }) => {
  const [field, setField] = React.useState();
  const [operator, setOperator] = React.useState();
  const [value, setValue] = React.useState();

  const handleFieldChange = (e: any, { value }: any) => {
    setField(value);
    dispatch({
      type: 'APPEND_FILTER',
      payload: { value: JSON.stringify({ field: value }) },
    });
  };

  const handleOperatorChange = (e: any, { value }: any) => {
    setOperator(value);
    dispatch({
      type: 'APPEND_FILTER',
      payload: { value: JSON.stringify({ operator: value }) },
    });
  };

  const handleValueChange = (e: any, { value }: any) => {
    setOperator(value);
    dispatch({
      type: 'APPEND_FILTER',
      payload: { value: JSON.stringify({ value: value }) },
    });
  };

  const handleAddBtnClick = () => {
    onAddBtnClick();
  };

  const handleRemoveBtnClick = () => {
    onRemoveBtnClick(index);
  };

  return (
    <React.Fragment>
      {index !== 0 ? <FilterOperator /> : null}

      <StyledGrid columns={1} className="indent-right">
        <StyledFilterGroup>
          <StyledFieldContainer className={count > 1 ? 'show-horizontal-connector' : ''}>
            <StyledDropdown
              onChange={handleFieldChange}
              options={fields}
              placeholder="Select field"
              selection
              value={field}
            />
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledDropdown
              options={operators}
              placeholder="Select operator"
              selection
              onChange={handleOperatorChange}
              value={operator}
            />
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledInput placeholder="Enter filter value" onChange={handleValueChange} value={value} />
          </StyledFieldContainer>
          <StyledActionGroup>
            <StyledFieldContainer className="action-buttons">
              {index === 0 ? <Button icon="add" onClick={handleAddBtnClick} size="mini" /> : null}
              {index !== 0 ? <Button icon="close" onClick={handleRemoveBtnClick} size="mini" /> : null}
            </StyledFieldContainer>
          </StyledActionGroup>
        </StyledFilterGroup>
      </StyledGrid>
    </React.Fragment>
  );
};

export default FilterGroup;
