import React from 'react';
import { Button } from 'semantic-ui-react';

interface IProps {
  positive?: boolean;
  disabled?: boolean;
  label?: string;
  onClick?: () => void;
}

const StandardButton = ({ positive, disabled, label, ...rest }: IProps) => {
  return (
    <Button positive={positive} disabled={disabled} {...rest} data-testid="standard-button">
      {label}
    </Button>
  );
};

export default StandardButton;
