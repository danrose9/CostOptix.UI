import React from 'react';
import { Button } from 'semantic-ui-react';

interface Props {
  positive?: boolean;
  disabled?: boolean;
  label?: string;
  onClick?: () => void;
}

const StandardButton = ({ positive, disabled, label, ...rest }: Props) => {
  return (
    <Button positive={positive} disabled={disabled} {...rest} data-testid="standard-button">
      {label}
    </Button>
  );
};

export default StandardButton;
