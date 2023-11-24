import React, { useState, useEffect } from 'react';
import { fields, operators, dataTypes } from './operators';
import {
  StyledDropdown,
  StyledFilterGroup,
  StyledFieldContainer,
  StyledInput,
  StyledGrid,
} from '../__styles__/StyledQueryFilter';
import FilterGroupActionButtons from './FilterGroupActionButtons';
import FilterOperator from './FilterOperator';
import { DropdownItemProps, Dropdown } from 'semantic-ui-react';

interface IFilterGroupProps {
  count: number;
  containerIndex: number;
  onRemoveBtnClick: () => void;
  onAddBtnClick: () => void;
  dispatch: React.Dispatch<any>;
  key: number;
  updateSetIsQueryValid: (value: boolean) => void;
  initialData?: any;
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
  reset,
}) => {
  const [field, setField] = useState(initialData ? initialData[containerIndex].field : '');
  const [operator, setOperator] = useState(initialData ? initialData[containerIndex].operator : '');
  const [filterValue, setFilterValue] = useState(initialData ? initialData[containerIndex].value : '');
  const conditionalOperator = initialData ? initialData[containerIndex].conditionalOperator : 'and';

  const [currentFilter, setCurrentFilter] = useState(null);
  const [isSelectionField, setIsSelectionField] = useState(false);
  const [availableOperators, setAvailableOperators] = useState(operators);
  const [options, setOptions] = useState([] as DropdownItemProps[]);
  const isValidValue = (value: any) => value !== undefined && value !== '';

  const allFieldsValid = (field: any, operator: any, filterValue: any) =>
    isValidValue(field) && isValidValue(operator) && isValidValue(filterValue);

  const getApplicableOperators = (fieldValue: string) => {
    const selectedField = fields.find((field) => field.value === fieldValue);
    if (!selectedField || !selectedField.datatype) return [];

    // Now TypeScript knows that selectedField.dataType is of type DataType
    const applicableOperators = dataTypes[selectedField.datatype];
    return operators.filter((op) => applicableOperators.includes(op.value));
  };

  const handleFieldChange =
    (attribute: string, setValue: Function) =>
    (e: React.ChangeEvent<HTMLInputElement> | React.SyntheticEvent<HTMLElement, Event>, { value }: any) => {
      setValue(value);
      if (attribute === 'field') {
        // Check if the field is a selection field and update the state
        const selectedField = fields.find((f) => f.value === value);

        // Check if the operator is 'eq' or 'ne'
        const isOperatorEqOrNe = operator === 'eq' || operator === 'ne';

        // Set selectionfield to true if the field has options and the operator is 'eq' or 'ne'
        setIsSelectionField(selectedField?.options != null && isOperatorEqOrNe);
        setOptions(isOperatorEqOrNe ? selectedField?.options ?? [] : []);
        setOperator('');
      } else if (attribute === 'operator') {
        // Check if the field has options and the operator is now 'eq' or 'ne'
        const selectedField = fields.find((f) => f.value === field);
        const isOperatorEqOrNe = value === 'eq' || value === 'ne';

        setIsSelectionField(selectedField?.options != null && isOperatorEqOrNe);
        setOptions(isOperatorEqOrNe ? selectedField?.options ?? [] : []);
      }
      setCurrentFilter((prevFilter: any) => {
        const updatedFilter = { ...prevFilter };
        updatedFilter[attribute] = value;
        return updatedFilter;
      });
    };

  useEffect(() => {
    // Check if the reset value changes
    if (reset) {
      setField('');
      setOperator('');
      setFilterValue('');
    }
  }, [reset]);

  useEffect(() => {
    const isAllfieldsValid = allFieldsValid(field, operator, filterValue);
    if (isAllfieldsValid) {
      updateSetIsQueryValid(true);
    } else {
      updateSetIsQueryValid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field, operator, filterValue, currentFilter, updateSetIsQueryValid]);

  useEffect(() => {
    dispatch({ type: 'UPDATE_FILTER', payload: { value: currentFilter, index: containerIndex } });
  }, [currentFilter, dispatch, containerIndex]);

  useEffect(() => {
    setAvailableOperators(getApplicableOperators(field));
  }, [field]);

  return (
    <React.Fragment>
      {containerIndex !== 0 ? (
        <FilterOperator dispatch={dispatch} index={containerIndex} value={conditionalOperator} />
      ) : null}

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
              data-testid="field-dropdown"
            />
          </StyledFieldContainer>
          <StyledFieldContainer>
            <StyledDropdown
              options={availableOperators}
              placeholder="Select operator"
              selection
              onChange={handleFieldChange('operator', setOperator)}
              value={operator}
              data-testid="operator-dropdown"
            />
          </StyledFieldContainer>
          <StyledFieldContainer>
            {isSelectionField ? (
              <Dropdown
                placeholder="Select value"
                selection
                options={options}
                onChange={handleFieldChange('value', setFilterValue)}
                data-testid="select-value-dropdown"
              />
            ) : (
              <StyledInput
                placeholder="Enter filter value"
                onChange={handleFieldChange('value', setFilterValue)}
                value={filterValue}
                data-testid="type-value-dropdown"
              />
            )}
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
