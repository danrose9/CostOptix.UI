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
  index: number;
  onRemoveBtnClick: (index: number) => void;
  onAddBtnClick: () => void;
  dispatch: React.Dispatch<any>;
  key: number;
}

const FilterGroup: React.FC<IFilterGroupProps> = ({ count, index, onRemoveBtnClick, onAddBtnClick, dispatch }) => {
  const [field, setField] = useState();
  const [operator, setOperator] = useState();
  const [filterValue, setFilterValue] = useState('');

  /* currentFilter is the current state of the indexed filter */
  const [currentFilter, setCurrentFilter] = useState({ field: '', operator: '', value: '' });

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
    dispatch({ type: 'UPDATE_FILTER', payload: { value: currentFilter, index: index } });
  }, [currentFilter, dispatch, index]);

  return (
    <React.Fragment>
      {index !== 0 ? <FilterOperator dispatch={dispatch} index={index} /> : null}

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
          <FilterGroupActionButtons
            onAddBtnClick={onAddBtnClick}
            onRemoveBtnClick={onRemoveBtnClick}
            index={index}
            count={count}
            dispatch={dispatch}
          />
        </StyledFilterGroup>
      </StyledGrid>
    </React.Fragment>
  );
};

export default FilterGroup;
