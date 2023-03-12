import React from 'react';
import { Button } from 'semantic-ui-react';

export interface IStandardButton {
  positive?: boolean;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
  onClick?: () => void;
}

const StandardButton = ({ positive, disabled, label, loading, ...rest }: IStandardButton) => {
  return (
    <Button positive={positive} disabled={disabled} loading={loading} {...rest} data-testid="standard-button">
      {label}
    </Button>
  );
};

export default StandardButton;
