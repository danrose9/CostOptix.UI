import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { fields, operators, conditionalOperators } from './operators';
import {
  StyledDropdown,
  StyledFilterGroup,
  StyledFieldContainer,
  StyledInput,
  StyledActionGroup,
  StyledGrid,
} from '../__styles__/StyledQueryFilter';
import { INITIAL_STATE, INTIAL_FILTER } from '../../reducers/updateFilterReducer';

const FilterOperator: React.FC<any> = ({ dispatch, index }) => {
  const [value, setValue] = React.useState('and');

  useEffect(() => {
    // dispatch({
    //   type: 'UPDATE_CONDITIONAL_OPERATOR',
    //   payload: { value: { conditionalOperator: value } },
    // });
  }, [value, dispatch]);

  const handleChange = (e: any, { value }: any) => {
    setValue(value);
  };

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
            value={value}
          />
        </StyledFieldContainer>
      </StyledFilterGroup>
    </StyledGrid>
  );
};

const FilterGroup: React.FC<any> = ({ count, index, onRemoveBtnClick, onAddBtnClick, dispatch, nextIndex }) => {
  const newFilter = { [nextIndex !== undefined ? nextIndex : index]: { field: '', operator: '', value: '' } };

  const [field, setField] = useState();
  const [operator, setOperator] = useState();
  const [filterValue, setFilterValue] = useState('');

  /* currentFilter is the current state of the indexed filter */
  const [currentFilter, setCurrentFilter] = useState({ field: '', operator: '', value: '' });

  useEffect(() => {
    console.log('**useEffect fired**');
    dispatch({
      type: 'ADD_FILTER',
      payload: { value: newFilter },
    });
  }, [dispatch]);

  const handleFieldChange =
    (attribute: string, setValue: Function) =>
    (e: any, { value }: any) => {
      console.log('handleFieldChange Index: ', index);
      console.log('handleFieldChange value: ', value);

      setValue(value);
      setCurrentFilter((prevFilter: any) => {
        const updatedFilter = { ...prevFilter };
        updatedFilter[attribute] = value;

        return updatedFilter;
      });

      /* TODO: This dispatch is still firing ADD_FILTER action */
      /* TODO: The currentFilter should just be the current state of the filter with no index, pass the index in the payload */
      dispatch({ type: 'UPDATE_FILTER', payload: { value: currentFilter } });
    };

  const handleAddBtnClick = () => {
    onAddBtnClick();
  };

  const handleRemoveBtnClick = () => {
    onRemoveBtnClick(index);
  };

  const limitFilter = () => {
    return true;
  };

  const maxFilterLimit = 5;

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
          <StyledActionGroup>
            <StyledFieldContainer className="action-buttons">
              {index === 0 ? (
                <Button icon="add" onClick={handleAddBtnClick} size="mini" disabled={count === maxFilterLimit} />
              ) : null}
              {index !== 0 ? <Button icon="close" onClick={handleRemoveBtnClick} size="mini" /> : null}
            </StyledFieldContainer>
          </StyledActionGroup>
        </StyledFilterGroup>
      </StyledGrid>
    </React.Fragment>
  );
};

export default FilterGroup;
