import React from 'react';
import { Button } from 'semantic-ui-react';

interface Props {
  positive: boolean;
  disabled: boolean;
  label: string;
}

const ValidateServiceButton = (props: Props) => {
  const { positive, disabled, label } = props;

  return (
    <Button positive={positive} disabled={disabled}>
      {label}
    </Button>
  );
};

export default ValidateServiceButton;
