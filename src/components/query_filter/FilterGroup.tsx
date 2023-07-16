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
import { set } from 'immer/dist/internal';

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
  const [filterValue, setFilterValue] = React.useState('');
  const [currentFilter, setCurrentFilter] = React.useState({ field: '', operator: '', value: '' });

  React.useEffect(() => {
    dispatch({
      type: 'APPEND_FILTER',
      payload: { value: JSON.stringify(currentFilter) },
    });
  }, [currentFilter, dispatch]);

  const handleFieldChange =
    (attribute: string, setValue: Function) =>
    (e: any, { value }: any) => {
      setValue(value);
      setCurrentFilter((prevFilter) => ({ ...prevFilter, [attribute]: value }));
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
              onChange={handleFieldChange('field', setField)}
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
              onChange={handleFieldChange('operator', setOperator)}
              value={operator}
            />
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledInput
              placeholder="Enter filter value"
              onChange={handleFieldChange('value', setFilterValue)}
              value={filterValue}
            />
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
