import React, { useEffect } from 'react';
import { conditionalOperators } from './operators';
import { StyledDropdown, StyledFilterGroup, StyledFieldContainer, StyledGrid } from '../__styles__/StyledQueryFilter';

interface IFilterOperatorProps {
  dispatch: React.Dispatch<any>;
  index: number;
}

const FilterOperator: React.FC<IFilterOperatorProps> = ({ dispatch, index }) => {
  const [conditionalOperator, setConditionalOperator] = React.useState('and');

  useEffect(() => {
    dispatch({
      type: 'UPDATE_CONDITIONAL_OPERATOR',
      payload: { value: conditionalOperator, index: index },
    });
  }, [conditionalOperator, dispatch]);

  const handleChange = (e: any, { value }: any) => {
    setConditionalOperator(value);
  };

  return (
    <StyledGrid columns={1} className="filter-operator">
      <StyledFilterGroup>
        <StyledFieldContainer className="show-vertical-connector">
          <StyledDropdown
            data-testid="conditional-operator"
            className="set-minimum-width"
            onChange={handleChange}
            options={conditionalOperators}
            selection
            compact
            value={conditionalOperator}
          />
        </StyledFieldContainer>
      </StyledFilterGroup>
    </StyledGrid>
  );
};

export default FilterOperator;
