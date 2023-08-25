import React from 'react';
import { StyledFieldContainer, StyledActionGroup } from '../__styles__/StyledQueryFilter';
import { Button } from 'semantic-ui-react';

export interface IFilterGroupActionButtonsProps {
  onAddBtnClick: () => void;
  onRemoveBtnClick: () => void;
  containerIndex: number;
  count: number;
  dispatch: React.Dispatch<any>;
}

export const FilterGroupActionButtons: React.FC<IFilterGroupActionButtonsProps> = ({
  onAddBtnClick,
  onRemoveBtnClick,
  containerIndex,
  count,
  dispatch,
}) => {
  const newFilter = { [count]: { field: '', operator: '', value: '' } };

  const handleAddBtnClick = () => {
    dispatch({
      type: 'ADD_FILTER',
      payload: { value: newFilter, index: count },
    });
    onAddBtnClick();
  };

  const handleRemoveBtnClick = () => {
    onRemoveBtnClick();
  };

  const maxFilterLimit = 5;

  return (
    <StyledActionGroup>
      <StyledFieldContainer className="action-buttons">
        {containerIndex === 0 ? (
          <React.Fragment>
            <Button
              icon="add"
              onClick={handleAddBtnClick}
              size="mini"
              disabled={count === maxFilterLimit}
              data-testid="add-button"
            />
            <Button icon="close" onClick={handleRemoveBtnClick} size="mini" data-testid="remove-button" />
          </React.Fragment>
        ) : null}
      </StyledFieldContainer>
    </StyledActionGroup>
  );
};

export default FilterGroupActionButtons;
