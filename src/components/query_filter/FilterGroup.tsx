import React, { useState, useEffect } from 'react';
import { fields, operators } from './operators';
import {
  StyledDropdown,
  StyledFilterGroup,
  StyledFieldContainer,
  StyledInput,
  StyledGrid,
} from '../__styles__/StyledQueryFilter';
import FilterGroupActionButtons from './FilterGroupActionButtons';
import FilterOperator from './FilterOperator';

interface IFilterGroupProps {
  count: number;
  containerIndex: number;
  onRemoveBtnClick: () => void;
  onAddBtnClick: () => void;
  dispatch: React.Dispatch<any>;
  key: number;
  updateSetIsQueryValid: (value: boolean) => void;
  initialData?: any;
  filter: any;
  reset: number;
}

const FilterGroup: React.FC<IFilterGroupProps> = ({
  count,
  containerIndex,
  onRemoveBtnClick,
  onAddBtnClick,
  dispatch,
  updateSetIsQueryValid,
  initialData,
  filter,
  reset,
}) => {
  const [field, setField] = useState(initialData ? initialData[containerIndex].field : '');
  const [operator, setOperator] = useState(initialData ? initialData[containerIndex].operator : '');
  const [filterValue, setFilterValue] = useState(initialData ? initialData[containerIndex].value : '');
  const [currentFilter, setCurrentFilter] = useState(null);
  const isValidValue = (value: any) => value !== undefined && value !== '';

  const allFieldsValid = (field: any, operator: any, filterValue: any) =>
    isValidValue(field) && isValidValue(operator) && isValidValue(filterValue);

  useEffect(() => {
    // Check if the reset value changes
    if (reset) {
      setField('');
      setOperator('');
      setFilterValue('');
    }
  }, [reset]);

  useEffect(() => {
    if (allFieldsValid(field, operator, filterValue)) {
      updateSetIsQueryValid(true);
    } else {
      updateSetIsQueryValid(false);
    }
  }, [field, operator, filterValue, currentFilter, dispatch]);

  const handleFieldChange =
    (attribute: string, setValue: Function) =>
    (e: any, { value }: any) => {
      setValue(value);
      setCurrentFilter((prevFilter: any) => {
        const updatedFilter = { ...prevFilter };
        updatedFilter[attribute] = value;

        return updatedFilter;
      });
    };

  useEffect(() => {
    dispatch({ type: 'UPDATE_FILTER', payload: { value: currentFilter, index: containerIndex } });
  }, [currentFilter, dispatch, containerIndex]);

  return (
    <React.Fragment>
      {containerIndex !== 0 ? <FilterOperator dispatch={dispatch} index={containerIndex} /> : null}

      <StyledGrid columns={1} className="indent-right">
        <StyledFilterGroup data-testid="filter-group">
          <StyledFieldContainer className={count > 1 ? 'show-horizontal-connector' : ''}>
            <StyledDropdown
              className="set-maximum-width"
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
          <FilterGroupActionButtons
            onAddBtnClick={onAddBtnClick}
            onRemoveBtnClick={onRemoveBtnClick}
            containerIndex={containerIndex}
            count={count}
            dispatch={dispatch}
          />
        </StyledFilterGroup>
      </StyledGrid>
    </React.Fragment>
  );
};

export default FilterGroup;
