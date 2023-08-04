import React, { useEffect } from 'react';
import { StyledFieldContainer, StyledActionGroup } from '../__styles__/StyledQueryFilter';
import { Button } from 'semantic-ui-react';

export interface IFilterGroupActionButtonsProps {
  onAddBtnClick: () => void;
  onRemoveBtnClick: (index: number) => void;
  index: number;
  count: number;
  dispatch: React.Dispatch<any>;
  nextIndex?: number;
}

export const FilterGroupActionButtons: React.FC<IFilterGroupActionButtonsProps> = ({
  onAddBtnClick,
  onRemoveBtnClick,
  index,
  count,
  dispatch,
  nextIndex,
}) => {
  const newFilter = { [nextIndex !== undefined ? nextIndex : index]: { field: '', operator: '', value: '' } };

  const handleAddBtnClick = () => {
    onAddBtnClick();
  };

  const handleRemoveBtnClick = () => {
    onRemoveBtnClick(index);
  };

  const maxFilterLimit = 5;

  useEffect(() => {
    dispatch({
      type: 'ADD_FILTER',
      payload: { value: newFilter },
    });
  }, [dispatch]);

  return (
    <StyledActionGroup>
      <StyledFieldContainer className="action-buttons">
        {index === 0 ? (
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
